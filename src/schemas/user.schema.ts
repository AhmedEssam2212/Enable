import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { Role } from 'src/auth/enumurarions/roles.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop({ unique: true })
    username: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Depatment" })
    departmentId: Types.ObjectId;
    @Prop()
    role: Role;
}


export const UserSchema = SchemaFactory.createForClass(User);