import { Body ,Controller, Post , Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {User} from './users.model'
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';


@ApiTags('Users') //подписываем контроллер
@Controller('users')
export class UsersController {


    constructor(private usersService:UsersService){}


    @ApiOperation({summary: 'Создание пользователя'}) // описываем запрос
    @ApiResponse({status:201, type:User})
    @Post()
    create(@Body() userDto:CreateUserDto){
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
}
