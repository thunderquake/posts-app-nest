import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  pass: string;
}
