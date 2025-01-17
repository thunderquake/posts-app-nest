import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FollowUserDto } from './dto/follow-user-dto';
import { UnfollowUserDto } from './dto/unfollow-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':username')
  async findUserByUsername(
    @Param('username') username: string,
    @Query('select') select?: string,
  ): Promise<User> {
    const selectedFields = select?.split(',') as (keyof User)[] | undefined;
    return this.userService.findByUsername(username, {
      select: selectedFields,
    });
  }

  @Get(':id/followers')
  async getFollowers(@Param('id') id: string) {
    return this.userService.getFollowers(id);
  }

  @Get(':id/following')
  async getFollowing(@Param('id') id: string) {
    return this.userService.getFollowing(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put('follow')
  async followUser(@Body() followUserDto: FollowUserDto): Promise<User> {
    return this.userService.followUser(followUserDto);
  }

  @Put('unfollow')
  async unfollowUser(@Body() unfollowUserDto: UnfollowUserDto): Promise<User> {
    return this.userService.unfollowUser(unfollowUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
