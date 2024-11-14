import { IsUUID } from 'class-validator';

export class UnfollowUserDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  targetUserId: string;
}
