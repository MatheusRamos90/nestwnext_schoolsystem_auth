import { HttpStatus } from "@nestjs/common";

export class NotFoundException extends Error {
    statusCode = HttpStatus.NOT_FOUND;

    constructor(message: string) {
        super(message);
    }
}