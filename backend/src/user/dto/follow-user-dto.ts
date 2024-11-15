import { IsUUID } from 'class-validator';

export class FollowUserDto {
  @IsUUID(4)
  userId: string;

  @IsUUID(4)
  targetUserId: string;
}
