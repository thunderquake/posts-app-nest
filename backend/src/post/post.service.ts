import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  private readonly logger = new Logger('Post Service');

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: string): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    this.logger.log('Post ' + post.id + 'was created');
    return this.postRepository.save(post);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    post.content = updatePostDto.content;
    return this.postRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
