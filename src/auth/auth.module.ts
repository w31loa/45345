import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[ forwardRef(()=>UsersModule), //форвард реф нужнен чтобы предотвратить колцевую зависимость 
    JwtModule.register({
    secret: process.env.PRIVATE_KEY || 'SECRET', // достаем секрет из процесса
    signOptions:{
      expiresIn: '24h' // время жизни токена
    }
  })],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
