import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FollowUserDto } from './dto/follow-user-dto';
import { UnfollowUserDto } from './dto/unfollow-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findByUsername(
    username: string,
    options?: { select?: (keyof User)[] },
  ): Promise<User> {
    return this.userRepository.findOne({
      where: { name: username },
      select: options?.select,
    });
  }

  async findById(
    id: string,
    options?: { select?: (keyof User)[] },
  ): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      select: options?.select,
    });
  }
  async findByUser(name: string): Promise<User> {
    return this.userRepository.findOne({
      where: { name },
      relations: ['posts', 'followers', 'following'],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['posts', 'followers', 'following'],
    });
  }

  async markEmailAsConfirmed(email: string) {
    return this.userRepository.update({ email }, { isVerified: true });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getFollowers(userId: string): Promise<Partial<User>[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['followers'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.followers.map((follower) => ({
      id: follower.id,
      name: follower.name,
    }));
  }

  async getFollowing(userId: string): Promise<Partial<User>[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['following'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.following.map((followedUser) => ({
      id: followedUser.id,
      name: followedUser.name,
    }));
  }

  async followUser(followUserDto: FollowUserDto): Promise<User> {
    const { userId, targetUserId } = followUserDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['following'],
    });
    const targetUser = await this.userRepository.findOne({
      where: { id: targetUserId },
    });

    if (!user || !targetUser) {
      throw new NotFoundException('User not found');
    }

    if (
      user.following.some((followedUser) => followedUser.id === targetUserId)
    ) {
      throw new ConflictException('Already following this user');
    }

    user.following.push(targetUser);
    await this.userRepository.save(user);

    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['following'],
    });
  }

  async unfollowUser(unfollowUserDto: UnfollowUserDto): Promise<User> {
    const { userId, targetUserId } = unfollowUserDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['following'],
    });
    const targetUser = await this.userRepository.findOne({
      where: { id: targetUserId },
    });

    if (!user || !targetUser) {
      throw new NotFoundException('User not found');
    }

    user.following = user.following.filter(
      (followedUser) => followedUser.id !== targetUserId,
    );
    await this.userRepository.save(user);

    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['following'],
    });
  }

  async validateUsername(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { name: username },
    });

    return !user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (updateUserDto.name) {
      const existingUserWithUsername = await this.userRepository.findOne({
        where: { name: updateUserDto.name },
      });

      if (existingUserWithUsername && existingUserWithUsername.id !== id) {
        throw new ForbiddenException({
          status: 403,
          message: 'Username already taken',
        });
      }
    }

    if (!user) {
      throw new NotFoundException(`User ${user.name}  not found`);
    }

    return this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
