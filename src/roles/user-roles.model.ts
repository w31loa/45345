
import {Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript'
import {ApiProperty} from '@nestjs/swagger'
import { User } from 'src/users/users.model';
import { Role } from './roles.model';


@Table({tableName: 'user_roles', createdAt:false , updatedAt:false}) // указываем чтобы не записывалось время создание и обновления
export class UserRoles extends Model<UserRoles>{



    @Column({type: DataType.INTEGER, unique:true , autoIncrement:true , allowNull: false , primaryKey: true})
    id:number;

    @ForeignKey(()=> Role) //декоратор вторичного ключа
    @Column({type: DataType.INTEGER})
    roleId: number;


    @ForeignKey(()=> User) //декоратор вторичного ключа
    @Column({type: DataType.INTEGER})
    userId: number;

  
}