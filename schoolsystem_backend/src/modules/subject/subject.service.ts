import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { EnumStatus } from 'src/enums/enum-status';
import { InternalServerErrorException } from 'src/exceptions/internal-server-error-exception.dto';
import { NotFoundException } from 'src/exceptions/not-found-exception.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectResponseDto } from './dto/subject-response.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject, SubjectDocument } from './schemas/subject.schema';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private readonly subjectModel: Model<SubjectDocument>
  ) {}
    
  async create(createSubjectDto: CreateSubjectDto): Promise<SubjectResponseDto> {
    try {
      const subject = new this.subjectModel(createSubjectDto);
      const subjectCreated: SubjectDocument = await subject.save();

      return new SubjectResponseDto(subjectCreated);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<any> {
    return (await this.subjectModel.find({ status: EnumStatus.ACTIVE }).exec())
      .flatMap((subject: SubjectDocument) => new SubjectResponseDto(subject));
  }

  async findOne(id: string): Promise<SubjectResponseDto> {
    const subject: SubjectDocument = await this.subjectModel.findById(id).exec();
    if (!subject) {
      throw new NotFoundException('Subject not found.');
    }
    return new SubjectResponseDto(subject);
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<SubjectResponseDto> {
    await this.findOne(id);   

    try {
      const subjectUpdated: SubjectDocument = await this.subjectModel.findOneAndUpdate({ _id: id }, updateSubjectDto, { new: false });
      return new SubjectResponseDto(subjectUpdated);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.subjectModel.findOneAndUpdate({ _id: id }, { status: EnumStatus.DESACTIVE }, { new: false });
    console.log(`Subject ${id} is DESACTIVE.`);
  }
}
