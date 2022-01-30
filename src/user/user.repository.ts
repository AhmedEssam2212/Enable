import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }


    async create(createUserDto: CreateUserDto): Promise<User> {
        return await new this.userModel(createUserDto).save();
    }

    async findAll() {
        return await this.userModel.find();
    }

    async findById(id: Number): Promise<User> {
        return await this.userModel.findOne({ id });
    }

    async findByUsername(username: String): Promise<User> {
        return await this.userModel.findOne({ username });
    }
    async findByDepartmentId(departmentId: Types.ObjectId): Promise<User[]> {
        return await this.userModel.find({ departmentId });
    }


    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.userModel.updateOne({ id }, { $set: { ...updateUserDto } });
    }

    async delete(id: number) {
        return await this.userModel.deleteOne({ id });
    }
}