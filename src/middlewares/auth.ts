import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Verificar token en header o cookie
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido' });
  }
};

export default authMiddleware;