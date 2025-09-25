import { JwtPayload } from 'src/auth/types/jwt-payload';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
