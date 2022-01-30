import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema()
export class Department {

    @Prop({ required: true, unique: true })
    name: string;

}

export const DepartmentSchema = SchemaFactory.createForClass(Department);