import { HttpStatus } from "@nestjs/common";

export class InternalServerErrorException extends Error {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    constructor(message: string) {
        super(message);
    }
}