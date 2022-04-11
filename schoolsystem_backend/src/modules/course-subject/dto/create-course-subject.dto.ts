import { IsArray, IsNotEmpty } from "class-validator";

export class CreateCourseSubjectDto {
    @IsNotEmpty()
    course_id: string;

    @IsNotEmpty()
    @IsArray()
    subjects_id: string[];
}
