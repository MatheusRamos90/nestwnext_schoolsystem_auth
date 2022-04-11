import { EnumStatus } from "src/enums/enum-status";
import { EnumTimeCourse } from "src/enums/enum-time-course";
import { CourseDocument } from "../schemas/course.schema";

export class CourseResponseDto {
    id: any;
    name: string;
    duration: number;
    time_course: EnumTimeCourse;
    status: EnumStatus;

    constructor(model: CourseDocument) {
        this.id = model._id;
        this.name = model.name;
        this.duration = model.duration;
        this.time_course = model.time_course;
        this.status = model.status;
    }    
}