import { EnumRoles } from "src/enums/enum-roles";
import { UserDocument } from "../schemas/user.schema";

export class UserResponseDto {
    id: any;
    name: string;
    email: string;
    roles: Array<EnumRoles>;

    constructor(dto: UserDocument) {
        this.id = dto._id;
        this.name = dto.name;
        this.email = dto.email;
        this.roles = dto.roles;
    }
}