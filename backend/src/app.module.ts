import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post/post.entity';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'thunderquake',
      password: '156834',
      database: 'nest_posts',
      entities: [Post],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PostModule,
  ],
})
export class AppModule {}
