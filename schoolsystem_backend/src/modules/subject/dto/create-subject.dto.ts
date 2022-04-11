import { IsEnum, IsNotEmpty } from "class-validator";
import { EnumStatus } from "src/enums/enum-status";

export class CreateSubjectDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEnum(EnumStatus)
    status: EnumStatus;
}
