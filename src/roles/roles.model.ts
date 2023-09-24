
import {Model, Table, Column, DataType, BelongsToMany} from 'sequelize-typescript'
import {ApiProperty} from '@nestjs/swagger'
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs{ //описываем обязательные поля для создания объекта
    value:string;
    discription:string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role , RoleCreationAttrs>{
    @ApiProperty({example: 'ADMIN', description: 'Role value'}) // описываем входные данные
    @Column({type: DataType.STRING, unique:true , allowNull: false})
    value:string;

    @ApiProperty({example: 'Administrator', description: 'Role discription'})// описываем входные данные
    @Column({type: DataType.STRING, allowNull: false})
    description: string;


    @BelongsToMany( ()=> User , ()=> UserRoles) //в этом декораторе указываем с какой таблицей делаем связь и через какую таблицу (связь многие ко многим)
    users:User[];
}