// src/helpers/jwt.handler.ts
import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

export function generateToken(payload: object, expiresIn = '1h') {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
