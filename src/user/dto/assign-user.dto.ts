import { Types } from "mongoose";


export class AssignUserDto {
    userId: string;
    departmentId: Types.ObjectId;
}
