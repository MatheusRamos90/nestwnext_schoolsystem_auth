import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/impl/jwt-auth.guard';
import { CourseSubjectService } from './course-subject.service';
import { CourseSubjectResponseDto } from './dto/course-subject-response.dto';
import { CreateCourseSubjectDto } from './dto/create-course-subject.dto';
import { UpdateCourseSubjectDto } from './dto/update-course-subject.dto';

@UseGuards(JwtAuthGuard)
@Controller('course-subject')
export class CourseSubjectController {
  constructor(private readonly courseSubjectService: CourseSubjectService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createCourseSubjectDto: CreateCourseSubjectDto): Promise<CourseSubjectResponseDto> {
    return await this.courseSubjectService.create(createCourseSubjectDto);
  }

  @Get()
  async findAll(): Promise<CourseSubjectResponseDto[]> {
    return await this.courseSubjectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CourseSubjectResponseDto> {
    return await this.courseSubjectService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseSubjectDto: UpdateCourseSubjectDto): Promise<CourseSubjectResponseDto> {
    return await this.courseSubjectService.update(id, updateCourseSubjectDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.courseSubjectService.remove(id);
  }
}
