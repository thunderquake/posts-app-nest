import { IsUUID } from 'class-validator';

export class FollowUserDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  targetUserId: string;
}
// src/users/dto/update-user.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
