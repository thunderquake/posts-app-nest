import { IsUUID } from 'class-validator';

export class GetFollowersDto {
  @IsUUID()
  userId: string;
}
