import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { Role } from "src/auth/enumurarions/roles.enum";

export class SearchUserDto {
    @IsNotEmpty()
    username: string;
    email: string;
    role: Role;
    departmentId: Types.ObjectId;
}
