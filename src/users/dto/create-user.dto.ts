import {ApiProperty} from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'email'}) // описываем входные данные
    readonly email: string;

    @ApiProperty({example: '123123', description: 'password'})
    readonly password: string;
}