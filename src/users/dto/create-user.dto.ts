import {ApiProperty} from '@nestjs/swagger'
import {  IsString, Length , IsEmail} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'email'}) // описываем входные данные
    @IsString({message:"Должно быть строкой"})
    @IsEmail({},{message:"Некоректный Email"})
    readonly email: string;

    @ApiProperty({example: '123123', description: 'password'})
    @IsString({message:"Должно быть строкой"})
    @Length(4,16, {message: 'Неправильный размер пароля'})
    readonly password: string;
}