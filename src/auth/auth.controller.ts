import { ApiTags } from '@nestjs/swagger';
import { Controller, Post , Body} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';


@ApiTags('Authorization') //подписываем контроллер
@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
        
    }
} 
