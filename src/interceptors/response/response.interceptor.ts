import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface SuccessResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

interface ErrorResponse {
  statusCode: number;
  message: string | object;
  error: string;
  timestamp: number;
  data: Record<string, never>;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, SuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<SuccessResponse<T>> {
    const response = context
      .switchToHttp()
      .getResponse<{ statusCode: number }>();
    const statusCode = response.statusCode ?? 200;
    const httpMethod = context.switchToHttp().getRequest<Request>().method;

    return next.handle().pipe(
      map((data: T): SuccessResponse<T> => {
        let message: string;

        switch (httpMethod) {
          case 'GET':
            message = 'Data fetched successfully';
            break;
          case 'POST':
            message = 'Data created successfully';
            break;
          case 'PATCH':
          case 'PUT':
            message = 'Data updated successfully';
            break;
          case 'DELETE':
            message = 'Data deleted successfully';
            break;
          default:
            message = 'Success';
        }

        return {
          statusCode,
          message,
          data,
        };
      }),
      catchError((err: unknown) => {
        const statusCode = err instanceof HttpException ? err.getStatus() : 500;

        const errorResponse: ErrorResponse = {
          statusCode,
          message:
            err instanceof Error
              ? err.message
              : new InternalServerErrorException().message,
          error: err instanceof Error ? err.name : 'Error',
          timestamp: Date.now(),
          data: {},
        };

        return throwError(() => new HttpException(errorResponse, statusCode));
      }),
    );
  }
}
