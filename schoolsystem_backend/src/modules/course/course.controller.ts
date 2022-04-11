import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/impl/jwt-auth.guard';
import { CourseService } from './course.service';
import { CourseResponseDto } from './dto/course-response.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@UseGuards(JwtAuthGuard)
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createCourseDto: CreateCourseDto): Promise<CourseResponseDto> {
    return await this.courseService.create(createCourseDto);
  }

  @Get()
  async findAll(): Promise<CourseResponseDto[]> {
    return await this.courseService.findAll();
  }

  @Get(':id')
  @HttpCode(302)
  async findOne(@Param('id') id: string): Promise<CourseResponseDto> {
    return await this.courseService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): Promise<CourseResponseDto> {
    return await this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.courseService.remove(id);
  }
}
