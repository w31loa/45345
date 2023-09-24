import { UsersService } from './../users/users.service';
import { Injectable , HttpException, HttpStatus, UnauthorizedException} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {JwtService} from '@nestjs/jwt/dist'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { error } from 'console';

@Injectable() 
export class AuthService {
   
    constructor(private usersService : UsersService,
                private jwtService:JwtService){}


    async login(userDto: CreateUserDto){
       const user = await this.validateUser(userDto)
       return this.generateToken(user)
    }

  
    async registration(userDto: CreateUserDto){
        const candidate = await this.usersService.getByEmail(userDto.email)
        if(candidate){
            throw new HttpException('No user with this email', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.usersService.createUser({...userDto , password: hashPassword})
        return this.generateToken(user)
    }


    private async generateToken(user:User){
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return{
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto:CreateUserDto){
        const user = await this.usersService.getByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password , user.password)
        if(user&& passwordEquals){
            return user
        }
        throw new UnauthorizedException({message: 'Неверный логин или пароль'})
    }
}
