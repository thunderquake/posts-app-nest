import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UUIDDto } from './dto/uuid.dto';
import { Post } from './post.entity';

export default interface IPost {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: string;
}
@Injectable()
export class PostService {
  private readonly logger = new Logger('Post Service');

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private userService: UserService,
  ) {}

  async findAll(): Promise<IPost[]> {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user') // Join the user entity
      .addSelect('user.name') // Only select the user's name
      .orderBy('post.createdAt', 'DESC') // Order posts by createdAt
      .getMany()
      .then((posts) =>
        posts.map((post) => ({
          id: post.id,
          content: post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          userId: post.user.id,
          user: post.user.name,
        })),
      );
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
