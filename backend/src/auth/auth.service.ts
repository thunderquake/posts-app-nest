import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const createdHashedPassword = await bcrypt.hash(signUpDto.pass, 10);

    const user = await this.userService.create({
      name: signUpDto.username,
      email: signUpDto.email,
      hashedPassword: createdHashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword, ...result } = user;
    return result;
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findByUser(signInDto.username);

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    const isPasswordMatching = await bcrypt.compare(
      signInDto.pass,
      user.hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid password');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword, ...result } = user;

    return result;
  }
}
