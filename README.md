# Sellfy Products Table - Frontend Test

This is a small React application that fetches product data from a remote JSON endpoint and displays it in a responsive table. It includes a modal for product details and a dropdown menu for sharing or deleting items.

## Features

- Fetches product data from an external JSON endpoint.
- Responsive table layout, adapts for mobile devices.
- Product modal with image, description, and share buttons.
- Dropdown menu to share or delete products.
- Proper handling of long descriptions and image resizing.

## Demo

(Optional: if you deployed or hosted your project, include a link)

## Getting Started

### Prerequisites

- Node.js (>= 16 recommended)
- npm (comes with Node.js) or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BigBawsLexus/Sellfy-mfa
cd sellfy-products-table

2. Install dependencies:

npm install
# or
yarn install

3. Run the development server:

npm start
# or
yarn start

4. Open the app in your browser:
http://localhost:3000

5. Build for Production

npm run build
# or
yarn build

This will create a build folder ready to be deployed.
Folder Structure
  src/ - React components and logic
  src/App.tsx - Main application component
  src/currency.ts - Utility to get currency symbols
  src/App.css - Styles

Notes
  Used TypeScript interfaces to type product data for better maintainability.
  Used axios for HTTP requests.
  Lazy-loading images could be added in the future to improve performance.
  Dropdown menu and modal logic are managed via React state for simplicity.
  CSS is responsive with a mobile-first approach and avoids external dependencies.

Known Issues / TODO
  Add error/loading UI when fetching products.
  Share buttons currently only log to console; could integrate real social sharing API.