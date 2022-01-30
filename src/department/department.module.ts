import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentRepository } from './department.repository';
import { Department } from './entities/department.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentSchema } from 'src/schemas/Department.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/service.utill';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: Department.name,
    useFactory: () => {
      const schema = DepartmentSchema;
      schema.plugin(require('mongoose-unique-validator'), { message: 'Duplicate Name of Department is not allowed' });
      return schema;
    },
  }]), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '6000s' },
  }),],
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentRepository]
})
export class DepartmentModule { }
