import { HttpStatus } from "@nestjs/common";

export class UnauthorizedException extends Error {
    statusCode = HttpStatus.UNAUTHORIZED;

    constructor(message: string) {
        super(message);
    }
}