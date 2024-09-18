import { Injectable, NotFoundException } from '@nestjs/common';
const quotesData = require('./quotes.json'); 

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
}
