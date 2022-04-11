import { CourseResponseDto } from "src/modules/course/dto/course-response.dto";
import { SubjectResponseDto } from "src/modules/subject/dto/subject-response.dto";
import { SubjectDocument } from "src/modules/subject/schemas/subject.schema";
import { CourseSubjectDocument } from "../schemas/course-subject.schema";

export class CourseSubjectResponseDto {
    id: any;
    course: CourseResponseDto;
    subjects: SubjectResponseDto[];

    constructor(model?: CourseSubjectDocument) {
        this.id = model._id;
        this.course = new CourseResponseDto(model.course);
        this.subjects = model.subjects.flatMap((s: SubjectDocument) => new SubjectResponseDto(s));
    }
}