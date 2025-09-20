export const CURRENCY_SYMBOLS = {
    USD: '$',
    CAD: 'CAD$',
    AUD: 'AUD$',
    JPY: '¥',
    INR: '₹',
    EUR: '€',
    GBP: '£',
    CHF: 'CHF',
    RUB: '₽',
    CNY: '¥',
  } as const;
  
  export type CurrencyCode = keyof typeof CURRENCY_SYMBOLS;
  
  export function getCurrencySymbol(code: string): string {
    return (CURRENCY_SYMBOLS as Record<string, string>)[code] ?? code;
  }