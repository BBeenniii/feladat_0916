import { Controller, Get, Param, Render, NotFoundException, Delete, Res, Query } from '@nestjs/common';
const quotesData = require('./quotes.json'); 
import { QuotesService } from './quotes.service';
import { Response } from 'express';

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
  @Render('quote') 
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

  @Delete('deleteQuote/:id')
  @Render('deleteQuote')
  async deleteQuoteById(@Param('id') id: string) {
    const quoteId = parseInt(id, 10);
    if (isNaN(quoteId)) {
      return { message: 'Invalid ID formatum' };
    }
  
    const success = this.quotesService.deleteQuoteById(quoteId);
    if (success) {
      return { message: 'Sikeres törlés' };
    } else {
      return { message: 'Ismeretlen idézet' };
    }
  }

  @Get('search')
  @Render('search')
  searchQuotes(@Query('text') text: string) {
    if (!text) {
      return { quotes: [], message: 'Kérlek, adj meg egy keresett kifejezést!' };
    }
    const quotes = this.quotesService.searchQuotes(text);
    if (quotes.length === 0) {
      return { quotes: [], message: `Nem található idézet a következő kifejezéssel: "${text}"` };
    }
    return { quotes, message: '' };
  }

  @Get('authorRandomForm')
  @Render('authorRandomForm')
  showAuthorRandomForm() {
    return {}; 
  }

  @Get('authorRandom')
  @Render('authorRandom')
  getRandomQuoteByAuthor(@Query('author') author: string) {
    if (!author) {
      return { message: 'Kérlek, adj meg egy szerzőt!' };
    }

    const quote = this.quotesService.getRandomQuoteByAuthor(author);
    if (quote) {
      return { quote };
    } else {
      return { message: `Nem található idézet a következő szerzőtől: "${author}"` };
    }
  }
}