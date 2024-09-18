import quotesData from './quotes.json';

interface Quote {
  id: number;
  quote: string;
  author: string;
}

interface Quotes {
  quotes: Quote[];
  total: number;
  skip: number;
  limit: number;
}

export const quotes: Quotes = quotesData;