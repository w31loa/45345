import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post , Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';


@ApiTags('Roles') //подписываем контроллер
@Controller('roles')
export class RolesController {
    constructor(private roleService:RolesService){}


    @ApiOperation({summary: 'Создание роли'}) // описываем запрос
    @ApiResponse({status:201, type:Role})
    @Post()
    create(@Body() dto:CreateRoleDto){
        return this.roleService.createRole(dto)
    }

    @ApiOperation({summary: 'Получение роли по value'})
    @ApiResponse({status:200, type:Role})
    @Get('/:value') // параметр
    getByValue(@Param('value') value:string){  //декоратор для передачи параметров запроса
        return this.roleService.getRoleByValue(value)
    }
}
