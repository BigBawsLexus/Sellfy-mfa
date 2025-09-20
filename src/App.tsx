import { useEffect, useRef, useState } from 'react';
import './App.css';
import './currency.ts'
import axios from 'axios';
import { getCurrencySymbol } from './currency.ts';
import { decode } from 'he';

function App() {
  interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    currency: string;
    category: string;
    url: string;
    image_url: string;
  }

  const [products, setProducts] = useState<Product[]>([]); // all fetched products
  const [modalOpen, setModalOpen] = useState(false); // visibility of product card modal
  const [shareModal, setShareModal] = useState(false); // visibility of share button modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // contains selected product for modal
  
  const dropdownRef = useRef<HTMLTableCellElement | null>(null); //ref for useEffect to close share modal on click elsewhere

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/Sellfy/test-assignment-frontend/refs/heads/master/products.json')
      .then((response) => {
        console.log('Full Axios response:', response);
        console.log('Response data (the products):', response.data);
        setProducts(response.data.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  // TODO: need to add error handling UI or loading spinner for better UX.

  useEffect(() => { // close share modal on click elsewhere, dropdownRef related
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShareModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="table-container">
      <table className='main-table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className='product-row'>
              <td className="product_image">
                <a href={product.image_url} target="_blank" rel="noopener noreferrer">
                  <img src={product.image_url} alt={product.name} /> {/* TODO: consider using lazy loading for images */}
                </a>
              </td>
              <td className="product_description">
                <div className="product-name">{product.name}</div>
                <div className="product-description">
                  {product.description}
                </div>
              </td>
              <td className="product-category">{decode(product.category)}</td>
              <td className="product_currency">{getCurrencySymbol(product.currency)} {product.price}</td>
              <td className="dropdown-cell">
                <button
                  onClick={() => {
                    console.log(`Share button accessed, product: ${product.name}`)
                    console.log("Share modal is visible? ", shareModal)
                    if (shareModal === true && selectedProduct?._id !== product._id) {
                      setShareModal(false);
                    }
                    setSelectedProduct(product);
                    setShareModal((prev) => !prev);
                  }}
                >. . .</button>
                {shareModal && selectedProduct?._id === product._id && ( // Share modal w/ share and delete buttons
                  <div className="dropdown-menu">
                    <button
                      onClick={() => {
                        console.log(`Share clicked for product ${product.name}`)
                        openModal(product)
                        setShareModal(false)
                      }}
                    >Share</button>
                    <button
                      onClick={() => {
                        console.log(`Delete clicked for product ${product.name}`)
                        setProducts(prev =>
                          prev.filter(p => p._id !== product._id)
                        );
                      }
                      }
                    >Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && selectedProduct && ( // Modal after share button clicked, product card
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProduct.image_url} alt={selectedProduct.name} width={200} />
            <h3>{selectedProduct.name}</h3>
            <h4>{selectedProduct.description}</h4>
            <div>
              <button onClick={() => console.log('Share to Facebook')}>Facebook</button>
              <button onClick={() => console.log('Share to Twitter')}>Twitter</button>
              <button onClick={
                () => {
                  navigator.clipboard.writeText(selectedProduct.url);
                  console.log('URL copied to clipboard');
                }
              }>Copy URL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;