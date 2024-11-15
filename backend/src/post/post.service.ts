import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UUIDDto } from './dto/uuid.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  private readonly logger = new Logger('Post Service');

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private userService: UserService,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
  async findOne(UUIDDto: UUIDDto): Promise<Post> {
    return this.postRepository.findOne({ where: { id: UUIDDto.id } });
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.userService.findById(createPostDto.userId);

    const post = this.postRepository.create({
      content: createPostDto.content,
      userId: user.id,
    });

    return this.postRepository.save(post);
  }

  async update(UUIDDto: UUIDDto, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(UUIDDto);
    post.content = updatePostDto.content;
    return this.postRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
