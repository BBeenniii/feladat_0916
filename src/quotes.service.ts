import { Injectable } from '@nestjs/common';
const quotesData = require('./quotes.json'); 

@Injectable()
export class QuotesService {
  findAll() {
    return quotesData.quotes; 
  }
}
