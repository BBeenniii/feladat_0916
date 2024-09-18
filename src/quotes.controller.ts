import { Controller, Get, Render } from '@nestjs/common';
const quotesData = require('./quotes.json'); 
import { QuotesService } from './quotes.service';

@Controller()
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get('quotes')
  @Render('quotes')
  async findAll() {
    const quotes = this.quotesService.findAll();
    return { quotes };
  }

  @Get('randomQuote')
  @Render('randomQuote')
  getRandomQuote() {
    const quote = this.quotesService.getRandomQuote();
    return {
      quote: quote.quote,
      author: quote.author,
    };
  }

  @Get('topAuthors')
  @Render('topAuthors') 
  getTopAuthors() {
    const topAuthors = this.quotesService.getTopAuthors();
    return { topAuthors };
  }
}