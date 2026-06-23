import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const user = new User({ nombre, email, password, rol });
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.status(201).json({ message: 'Usuario registrado', token, user: { id: user._id, nombre, email, rol } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ message: 'Login exitoso', token, user: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};