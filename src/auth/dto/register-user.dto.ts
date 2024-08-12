import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {

    @IsEmail()
    email: string;

    @IsString()
    fullName: string;

    @MinLength(6)
    password: string;

}