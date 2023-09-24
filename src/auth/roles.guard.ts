import { JwtService } from '@nestjs/jwt/dist';
import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common'
import { Observable } from 'rxjs/internal/Observable'
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate{
    
    constructor(private jwtService: JwtService,
                private reflector: Reflector){}


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        const req = context.switchToHttp().getRequest()

        try {
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY , [context.getHandler() , context.getClass()])

            if(!requiredRoles){
            console.log(`Привет`)

                return true

            }
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if(bearer !== 'Bearer' || !token){
                  throw new UnauthorizedException({message:'Пользователь не авторизован'})
            }
            const user = this.jwtService.verify(token)
            req.user=user
            // console.log(user.roles.some(role=> console.log(role.value)))
            return user.roles.some(role=> requiredRoles.includes(role.value))
        } catch (error) {
            console.log(error)
            throw new HttpException('Нет доступа' , HttpStatus.FORBIDDEN)
        }

    }
  
}