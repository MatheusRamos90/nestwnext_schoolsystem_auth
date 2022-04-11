import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hashSync } from "bcrypt";
import { Model } from 'mongoose';
import { BadRequestException } from 'src/exceptions/bad-request-exception.dto';
import { InternalServerErrorException } from 'src/exceptions/internal-server-error-exception.dto';
import { NotFoundException } from 'src/exceptions/not-found-exception.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    if (createUserDto.password.trim() !== createUserDto.repassword.trim()) {
      throw new BadRequestException('Password dont match');
    }

    createUserDto.password = hashSync(createUserDto.password, 10);

    try {
      const user = new this.userModel(createUserDto);
      const userCreated: UserDocument = await user.save();

      return new UserResponseDto(userCreated);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    return (await this.userModel.find().exec())
      .flatMap((user) => new UserResponseDto(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return new UserResponseDto(user);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    await this.findOne(id);   

    try {
      const userUpdated = await this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, { new: false });
      return new UserResponseDto(userUpdated);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.userModel.deleteOne({ _id: id })
      .then(() => console.log(`User ${id} removed.`));
  }
}
