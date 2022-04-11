import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Course, CourseDocument } from "src/modules/course/schemas/course.schema";
import { Subject, SubjectDocument } from "src/modules/subject/schemas/subject.schema";

export type CourseSubjectDocument = CourseSubject & Document;

@Schema({ collection: 'course_subject' })
export class CourseSubject {
    @Prop({ required: [true, 'Course is required'],
        type: Types.ObjectId,
        ref: Course.name,
        unique: true
    })
    course: CourseDocument;

    @Prop({ required: [true, 'Subject is required'], type: Array<Types.ObjectId>(), ref: Subject.name})
    subjects: SubjectDocument[];
}

export const CourseSubjectSchema = SchemaFactory.createForClass(CourseSubject);