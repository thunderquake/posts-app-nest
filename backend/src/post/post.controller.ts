import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post as PostRequest,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UUIDDto } from './dto/uuid.dto';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param() UUIDDto: UUIDDto) {
    return this.postService.findOne(UUIDDto);
  }

  @PostRequest()
  async create(@Body() createPostDto: CreatePostDto): Promise<Post> {
    return this.postService.create(createPostDto);
  }

  @Put(':id')
  async update(
    @Param() UUIDDto: UUIDDto,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(UUIDDto, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.postService.remove(id);
  }
}
