import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { EnumStatus } from "src/enums/enum-status";
import { EnumTimeCourse } from "src/enums/enum-time-course";

export type CourseDocument = Course & Document;

@Schema({ collection: 'course' })
export class Course {
    @Prop({ required: [true, 'Name is required'], type: String })
    name: string;

    @Prop({ required: [true, 'Duration is required'], type: Number })
    duration: number;

    @Prop({ required: [true, 'TimeCourse is required'] })
    time_course: EnumTimeCourse;

    @Prop({ required: [true, 'Status is required'] })
    status: EnumStatus;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
