import { IsUUID } from 'class-validator';

export class GetFollowersDto {
  @IsUUID(4)
  userId: string;
}
