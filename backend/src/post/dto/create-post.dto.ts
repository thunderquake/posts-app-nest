import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(1, 500)
  content: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
