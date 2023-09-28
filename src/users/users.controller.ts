import { Body ,Controller, Post , Get, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {User} from './users.model'
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';


@ApiTags('Users') //подписываем контроллер
@Controller('users')
export class UsersController {


    constructor(private usersService:UsersService){}


    @ApiOperation({summary: 'Создание пользователя'}) // описываем запрос
    @ApiResponse({status:201, type:User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto:CreateUserDto){
        console.log(userDto)
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary: 'Получение всех пользоваталей'})
    @ApiResponse({status:200, type:[User]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }


    @ApiOperation({summary: 'Выдача ролей'})
    @ApiResponse({status:200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto:AddRoleDto){
        return this.usersService.addRole(dto)
    }


    @ApiOperation({summary: 'Забанить'})
    @ApiResponse({status:200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto:BanUserDto){
        return this.usersService.ban(dto)
    }
}
