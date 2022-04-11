import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { BadRequestException } from "src/exceptions/bad-request-exception.dto";
import { InternalServerErrorException } from "src/exceptions/internal-server-error-exception.dto";
import { NotFoundException } from "src/exceptions/not-found-exception.dto";
import { UnauthorizedException as UnauthorizedExceptionCustom } from "src/exceptions/unauthorized-exception.dto";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: any, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        
        const ctx = host.switchToHttp();

        const httpStatus = this.setStatusCode(exception);

        const responseBody = {
            statusCode: httpStatus,
            message: this.setMessage(exception),
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest())
        };

        console.log(`GlobalExceptionFilter >>> Throw exception: ${exception?.message}, Status: ${httpStatus}`);
        console.log(exception);

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }

    private setStatusCode(exception: any): HttpStatus {
        if (exception instanceof BadRequestException) {
            return HttpStatus.BAD_REQUEST;
        } else if (exception instanceof NotFoundException) {
            return HttpStatus.NOT_FOUND;
        } else if (exception instanceof InternalServerErrorException) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        } else if (exception instanceof UnauthorizedException || exception instanceof UnauthorizedExceptionCustom) {
            return HttpStatus.UNAUTHORIZED;
        }

        return HttpStatus.BAD_REQUEST;
    }

    private setMessage(exception: any): any {
        if (exception?.response?.message) {
            return exception.response.message;    
        }

        return exception?.message;
    }
}