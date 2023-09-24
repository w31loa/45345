import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role)private roleRepository:typeof Role){} //инжектим модель для того чтобы делать записи в бд

    async createRole(dto: CreateRoleDto){
        const role = await this.roleRepository.create(dto)
        return role;
    }


    async getRoleByValue(value:string){
        const role = await this.roleRepository.findOne({where: {value}})
        return role;

    }

}
