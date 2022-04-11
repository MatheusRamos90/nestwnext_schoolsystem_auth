import { IsEnum, IsNotEmpty } from "class-validator";
import { EnumStatus } from "src/enums/enum-status";
import { EnumTimeCourse } from "src/enums/enum-time-course";

export class CreateCourseDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    duration: number;

    @IsNotEmpty()
    @IsEnum(EnumTimeCourse)
    time_course: EnumTimeCourse;

    @IsNotEmpty()
    @IsEnum(EnumStatus)
    status: EnumStatus;
}
