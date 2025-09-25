// src/helpers/jwt.handler.ts
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'src/auth/types/jwt-payload';

const SECRET = process.env.JWT_SECRET || 'secret';

export function generateToken(payload: object, expiresIn = '1h') {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload;
}
