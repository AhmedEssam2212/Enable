import { BadRequestException, Injectable } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {

  constructor(private departmentRepository: DepartmentRepository) { }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return await this.departmentRepository.create(createDepartmentDto);
  }

  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.findAll();
  }

  async findOne(id: number) {
    return await this.departmentRepository.findById(id);
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return await this.departmentRepository.update(id, updateDepartmentDto);
  }

  async remove(name: string) {
    return await this.departmentRepository.delete(name);
  }
}
