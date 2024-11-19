import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { EmailVerifiedGuard } from './mail-confirmation/email-verified.guard';
import { EmailConfirmationController } from './mail-confirmation/mail-confirmation.controller';
import { EmailConfirmationModule } from './mail-confirmation/mail-confirmation.module';
import { EmailConfirmationService } from './mail-confirmation/mail-confirmation.service';
import { EmailModule } from './mail/mail.module';
import EmailService from './mail/mail.service';
import { Post } from './post/post.entity';
import { PostModule } from './post/post.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Post, User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PostModule,
    UserModule,
    EmailModule,
    EmailConfirmationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: EmailVerifiedGuard,
    },
    EmailService,
    EmailConfirmationService,
  ],
  controllers: [EmailConfirmationController],
})
export class AppModule {}
