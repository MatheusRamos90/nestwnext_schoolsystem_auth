import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CourseSubjectModule } from './course-subject/course-subject.module';
import { CourseModule } from './course/course.module';
import { SubjectModule } from './subject/subject.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, SubjectModule, CourseModule, CourseSubjectModule, AuthModule]
})
export class ModulesModule {}
