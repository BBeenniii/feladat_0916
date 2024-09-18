import { Controller, Get, Render, NotFoundException, Param } from '@nestjs/common';
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

  @Get('quotes/:id')
  @Render('quote')  // Az új EJS sablon neve
  async getQuoteById(@Param('id') id: string) {
    const quoteId = parseInt(id, 10);
    if (isNaN(quoteId)) {
      throw new NotFoundException('Invalid ID format');
    }
    const quote = await this.quotesService.getQuoteById(quoteId);
    return {
      quote: quote.quote,
      author: quote.author,
    };
  }
}