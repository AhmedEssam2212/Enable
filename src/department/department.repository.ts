import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { DepartmentDocument, Department } from "src/schemas/Department.schema";
import { CreateDepartmentDto } from "./dto/create-Department.dto";
import { UpdateDepartmentDto } from "./dto/update-Department.dto";

@Injectable()
export class DepartmentRepository {
    constructor(@InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>) { }


    async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
        return await new this.departmentModel(createDepartmentDto).save();
    }

    async findAll(): Promise<Department[]> {
        return await this.departmentModel.find();
    }

    async findById(id: Number): Promise<Department> {
        return await this.departmentModel.findOne({ id });
    }

    async findByDepartmentName(departmentname: String): Promise<Department> {
        return await this.departmentModel.findOne({ departmentname });
    }

    async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
        return await this.departmentModel.updateOne({ id }, { $set: { ...updateDepartmentDto } });
    }

    async delete(name: string) {
        return await this.departmentModel.deleteOne({ name });
    }
}