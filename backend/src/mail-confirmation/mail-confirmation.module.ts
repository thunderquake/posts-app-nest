import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import EmailService from 'src/mail/mail.service';
import { UserModule } from 'src/user/user.module';
import { EmailConfirmationController } from './mail-confirmation.controller';
import { EmailConfirmationService } from './mail-confirmation.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_VERIFICATION_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService, EmailService],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
