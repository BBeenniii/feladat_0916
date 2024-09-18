import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';

@Module({
  imports: [],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class AppModule {}
