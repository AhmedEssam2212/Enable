import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/service.utill';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  }]), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '6000s' },
  }),],
  controllers: [UserController],
  providers: [UserService, UserRepository, RolesGuard, AuthService],
  exports: [UserService],
})
export class UserModule { }
