import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse();

    this.logger.error(`Exception: ${JSON.stringify(error)}`);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      error: error,
    });
  }
}
