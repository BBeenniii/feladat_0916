import { Injectable } from '@nestjs/common';
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
}
