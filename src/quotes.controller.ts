import { Controller, Get, Render } from '@nestjs/common';
const quotesData = require('./quotes.json'); 
import { QuotesService } from './quotes.service';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  @Render('quotes')  // Rendereli a views/quotes.ejs fájlt
  async findAll() {
    const quotes = this.quotesService.findAll();
    return { quotes };
  }
}