import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { EmailConfirmationService } from './mail-confirmation.service';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Public()
  @Get()
  async confirm(@Query('token') token: string) {
    if (!token) {
      throw new BadRequestException('Token is required');
    }

    await this.emailConfirmationService.confirmEmail(token);

    return {
      message: 'Email successfully confirmed!',
    };
  }
}
