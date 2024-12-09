import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.authService.signIn(signInDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
