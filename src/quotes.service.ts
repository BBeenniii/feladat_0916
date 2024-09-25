import { Injectable, NotFoundException } from '@nestjs/common';
const quotesData = require('./quotes.json'); 
import { writeFileSync } from 'fs';

@Injectable()
export class QuotesService {
  findAll() {
    return quotesData.quotes; 
  }

  getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
    return quotesData.quotes[randomIndex];
  }

  getTopAuthors() {
    const authorCounts: { [author: string]: number } = {};

    quotesData.quotes.forEach((quote) => {
      if (authorCounts[quote.author]) {
        authorCounts[quote.author]++;
      } else {
        authorCounts[quote.author] = 1;
      }
    });

    const sortedAuthors = Object.entries(authorCounts)
      .map(([author, count]) => ({ author, count }))
      .sort((a, b) => b.count - a.count);

    return sortedAuthors;
  }

  getQuoteById(id: number) {
    const quote = quotesData.quotes.find(q => q.id === id);
    if (!quote) {
      throw new NotFoundException(`Quote with id ${id} not found`);
    }
    return quote;
  }

  deleteQuoteById(id: number) {
    const index = quotesData.quotes.findIndex(q => q.id === id);
    if (index === -1) {
      return false;
    }
    quotesData.quotes.splice(index, 1);

    writeFileSync(quotesData.quotesFile, JSON.stringify({ quotes: quotesData.quotes }, null, 2));
    return true;
  }

  searchQuotes(text: string) {
    return quotesData.quotes.filter(quote =>
      quote.quote.toLowerCase().includes(text.toLowerCase())
    );
  }

  getRandomQuoteByAuthor(author: string) {
    const authorQuotes = quotesData.quotes.filter(quote =>
      quote.author.toLowerCase() === author.toLowerCase()
    );
    
    if (authorQuotes.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * authorQuotes.length);
    return authorQuotes[randomIndex];
  }
}
