import { IsUUID } from 'class-validator';

export class FollowUserDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  targetUserId: string;
}
