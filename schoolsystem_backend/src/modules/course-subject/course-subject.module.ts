import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../course/schemas/course.schema';
import { Subject, SubjectSchema } from '../subject/schemas/subject.schema';
import { CourseSubjectController } from './course-subject.controller';
import { CourseSubjectService } from './course-subject.service';
import { CourseSubject, CourseSubjectSchema } from './schemas/course-subject.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: CourseSubject.name, schema: CourseSubjectSchema },
    { name: Course.name, schema: CourseSchema },
    { name: Subject.name, schema: SubjectSchema }])],
  controllers: [CourseSubjectController],
  providers: [CourseSubjectService]
})
export class CourseSubjectModule {}
