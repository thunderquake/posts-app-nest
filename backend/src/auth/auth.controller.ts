import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { EmailConfirmationService } from 'src/mail-confirmation/mail-confirmation.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.emailConfirmationService.sendVerificationLink(signUpDto.email);

    const user = await this.authService.signUp(signUpDto);

    return {
      message:
        'User successfully registered. Please check your email for verification.',
      userId: user.id,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
