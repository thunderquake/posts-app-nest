import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  content?: string;
}
