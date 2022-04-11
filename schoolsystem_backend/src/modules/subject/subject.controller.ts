import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/impl/jwt-auth.guard';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectResponseDto } from './dto/subject-response.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectService } from './subject.service';

@UseGuards(JwtAuthGuard)
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createSubjectDto: CreateSubjectDto): Promise<SubjectResponseDto> {
    return await this.subjectService.create(createSubjectDto);
  }

  @Get()
  async findAll(): Promise<SubjectResponseDto[]> {
    return await this.subjectService.findAll();
  }

  @Get(':id')
  @HttpCode(302)
  async findOne(@Param('id') id: string): Promise<SubjectResponseDto> {
    return await this.subjectService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto): Promise<SubjectResponseDto> {
    return await this.subjectService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.subjectService.remove(id);
  }
}
