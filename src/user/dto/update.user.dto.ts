import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";


export class UpdateDto {
    @IsEmail()
    @IsOptional()
    @IsString()
    email : string

    @IsOptional()
    @IsString()
    @MinLength(6, {message: 'Password must have 6 character at least'})
    password : string

    @IsOptional()
    @IsString()
    name : string

    @IsOptional()
    @IsString()
    avatarPath : string

    @IsOptional()
    @IsString()
    phone : string
}