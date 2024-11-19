import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import EmailService from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly usersService: UserService,
  ) {}

  async sendVerificationLink(email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_SECRET'),
      expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
    });

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;
    const text = `Welcome! Please confirm your email by clicking the following link: ${url}`;

    return this.emailService.sendMail({
      from: 'no-reply@demomailtrap.com',
      to: email,
      subject: 'Email Confirmation',
      text,
    });
  }

  async confirmEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_SECRET'),
      });

      const user = await this.usersService.findByEmail(payload.email);
      if (user.isVerified) {
        throw new Error('Email is already verified');
      }

      await this.usersService.markEmailAsConfirmed(payload.email);
    } catch (err) {
      throw new Error('Invalid or expired token' + err);
    }
  }
}
