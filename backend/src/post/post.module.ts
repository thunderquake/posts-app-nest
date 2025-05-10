import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { UserModule } from '../user/user.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
