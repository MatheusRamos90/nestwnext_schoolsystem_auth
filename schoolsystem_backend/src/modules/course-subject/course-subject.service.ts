import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { BadRequestException } from 'src/exceptions/bad-request-exception.dto';
import { InternalServerErrorException } from 'src/exceptions/internal-server-error-exception.dto';
import { NotFoundException } from 'src/exceptions/not-found-exception.dto';
import { Course, CourseDocument } from '../course/schemas/course.schema';
import { Subject, SubjectDocument } from '../subject/schemas/subject.schema';
import { CourseSubjectResponseDto } from './dto/course-subject-response.dto';
import { CreateCourseSubjectDto } from './dto/create-course-subject.dto';
import { UpdateCourseSubjectDto } from './dto/update-course-subject.dto';
import { CourseSubject, CourseSubjectDocument } from './schemas/course-subject.schema';

@Injectable()
export class CourseSubjectService {
  constructor(
    @InjectModel(CourseSubject.name) private readonly courseSubjectModel: Model<CourseSubjectDocument>,
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
    @InjectModel(Subject.name) private readonly subjectModel: Model<SubjectDocument>
  ) {}

  async create(createCourseSubjectDto: CreateCourseSubjectDto): Promise<CourseSubjectResponseDto> {
    const courseAlreadyExists: CourseSubjectDocument = await this.courseSubjectModel.findOne({ course: createCourseSubjectDto.course_id });

    if (courseAlreadyExists) {
      throw new BadRequestException(`Relation Course (${createCourseSubjectDto.course_id}) X Subjects already exists`);
    }

    const courseFind: CourseDocument = await this.courseModel.findById(createCourseSubjectDto.course_id).exec();

    if (!courseFind) {
      throw new NotFoundException(`Course not found with id ${createCourseSubjectDto.course_id}.`);
    }

    let subjectsFindArray: SubjectDocument[] = [];
    await this.getSubjectsModel(createCourseSubjectDto.subjects_id)
      .then((subject) => subject.map(s => subjectsFindArray.push(s)));

    try {
      const courseSubjects = new this.courseSubjectModel({ 
        course: {
          _id: courseFind._id,
          name: courseFind.name,
          duration: courseFind.duration.toExponential,
          time_course: courseFind.time_course,
          status: courseFind.status
        },
        subjects: subjectsFindArray });
      const courseSubjectsCreated: CourseSubjectDocument = await courseSubjects.save();

      console.log(`Relation Course (${courseSubjectsCreated.course._id}) X Subjects are created.`);

      return new CourseSubjectResponseDto(courseSubjectsCreated);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<CourseSubjectResponseDto[]> {
    return (await this.courseSubjectModel.find().exec())
      .flatMap((courseSubjects: CourseSubjectDocument) => new CourseSubjectResponseDto(courseSubjects));
  }

  async findOne(id: string): Promise<CourseSubjectResponseDto> {
    const courseSubject: CourseSubjectDocument = await this.courseSubjectModel.findById(id).exec();
    if (!courseSubject) {
      throw new NotFoundException(`Relation Course (${id}) X Subjects not found.`);
    }
    return new CourseSubjectResponseDto(courseSubject);
  }

  async update(id: string, updateCourseSubjectDto: UpdateCourseSubjectDto): Promise<CourseSubjectResponseDto> {
    await this.findOne(id);

    const courseFind: CourseDocument = await this.courseModel.findById(updateCourseSubjectDto.course_id).exec();

    if (!courseFind) {
      throw new NotFoundException(`Course not found with id ${updateCourseSubjectDto.course_id}.`);
    }

    let subjectsFindArray: SubjectDocument[] = [];
    await this.getSubjectsModel(updateCourseSubjectDto.subjects_id)
      .then((subject) => subject.map(s => subjectsFindArray.push(s)));

    try {
      const courseSubjects = { 
        course: {
          _id: courseFind._id,
          name: courseFind.name,
          duration: courseFind.duration.toExponential,
          time_course: courseFind.time_course,
          status: courseFind.status
        },
        subjects: subjectsFindArray };
      const courseSubjectsUpdated: CourseSubjectDocument = await this.courseSubjectModel.findOneAndUpdate({ _id: id }, courseSubjects, { new: false });

      console.log(`Relation Course (${courseSubjectsUpdated.course._id}) X Subjects are updated.`);

      return new CourseSubjectResponseDto(courseSubjectsUpdated);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.courseSubjectModel.deleteOne({ _id: id })
      .then(() => console.log(`Course and your subjects with id '${id}' are removed.`));
  }

  private async getSubjectsModel(subjects: string[]) {
    let subjectsModelArray: SubjectDocument[] = [];

    for (const subject of subjects) {
      const subjectFind: SubjectDocument = await this.subjectModel.findById(subject).exec();
      if (!subjectFind) {
        throw new NotFoundException(`Subject not found with id '${subject}'.`);
      }
      subjectsModelArray.push(subjectFind);
    }

    return subjectsModelArray;
  }
  
}
