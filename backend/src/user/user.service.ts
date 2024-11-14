import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

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

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['posts', 'followers', 'following'],
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async followUser(userId: string, followUserId: string): Promise<User> {
    const user = await this.findById(userId);
    const followUser = await this.findById(followUserId);

    // Add the followUser to the following list of user
    user.following.push(followUser);

    // Add the user to the followers list of followUser
    followUser.followers.push(user);

    // Save both users to the database
    await this.userRepository.save([user, followUser]);

    return user;
  }
}
