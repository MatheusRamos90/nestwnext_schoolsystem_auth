import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { EnumStatus } from 'src/enums/enum-status';
import { InternalServerErrorException } from 'src/exceptions/internal-server-error-exception.dto';
import { NotFoundException } from 'src/exceptions/not-found-exception.dto';
import { CourseResponseDto } from './dto/course-response.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<CourseResponseDto> {
    try {
      const course = new this.courseModel(createCourseDto);
      const courseCreated: CourseDocument = await course.save();

      return new CourseResponseDto(courseCreated);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<any> {
    return (await this.courseModel.find({ status: EnumStatus.ACTIVE }).exec())
      .flatMap((course: CourseDocument) => new CourseResponseDto(course));
  }

  async findOne(id: string): Promise<CourseResponseDto> {
    const course: CourseDocument = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException('Course not found.');
    }
    return new CourseResponseDto(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseResponseDto> {
    await this.findOne(id);   

    try {
      const courseUpdated: CourseDocument = await this.courseModel.findOneAndUpdate({ _id: id }, updateCourseDto, { new: false });
      return new CourseResponseDto(courseUpdated);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.courseModel.findOneAndUpdate({ _id: id }, { status: EnumStatus.DESACTIVE }, { new: false });
    console.log(`Course ${id} is DESACTIVE.`);
  }
}
