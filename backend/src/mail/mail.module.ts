import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import EmailService from './mail.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
