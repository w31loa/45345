
import {Model, Table, Column, DataType, BelongsToMany, HasMany} from 'sequelize-typescript'
import {ApiProperty} from '@nestjs/swagger'
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { Post } from 'src/posts/posts.model';

interface UserCreationAttrs{ //описываем обязательные поля для создания объекта
    email:string;
    password:string;
}

@Table({tableName: 'users'})
export class User extends Model<User , UserCreationAttrs>{
    @ApiProperty({example: '1', description: 'UID'}) // описываем входные данные
    @Column({type: DataType.INTEGER, unique:true , autoIncrement: true, primaryKey:true})
    id:number;

    @ApiProperty({example: 'user@mail.com', description: 'email'})// описываем входные данные
    @Column({type: DataType.STRING, unique:true , allowNull: false})
    email: string;

    @ApiProperty({example: '123123', description: 'password'})// описываем входные данные
    @Column({type: DataType.STRING , allowNull: false})
    password: string;

    @ApiProperty({example: 'true/false', description: 'Banned or not'})// описываем входные данные
    @Column({type: DataType.BOOLEAN , defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'talk too much', description: 'Ban reason'})// описываем входные данные
    @Column({type: DataType.STRING , allowNull: true})
    banReason: string;

    @BelongsToMany( ()=> Role , ()=> UserRoles) //в этом декораторе указываем с какой таблицей делаем связь и через какую таблицу (связь многие ко многим)
    roles:Role[];

    @HasMany(()=>Post)
    posts: Post[]
}