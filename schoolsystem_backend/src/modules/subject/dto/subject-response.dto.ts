import { EnumStatus } from 'src/enums/enum-status';
import { SubjectDocument } from '../schemas/subject.schema';

export class SubjectResponseDto {
    id: any;
    name: string;
    status: EnumStatus;

    constructor(model: SubjectDocument) {
        this.id = model._id;
        this.name = model.name;
        this.status = model.status;
    }
}
