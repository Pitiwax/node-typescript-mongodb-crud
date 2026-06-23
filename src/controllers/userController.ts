import { Request, Response } from 'express';
import { User } from '../models/User';

// 1. Obtener la lista completa de usuarios (sin las contraseñas por seguridad)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

// 2. Buscar un usuario específico por su ID único
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};

// 3. Modificar datos de un usuario (El cable que nos faltaba activar)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, rol } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Si envías un campo, el servidor lo actualiza; si no, deja el que ya estaba
    if (nombre) user.nombre = nombre;
    if (email) user.email = email;
    if (password) user.password = password; 
    if (rol) user.rol = rol;

    await user.save();

    // Convertimos el documento a un objeto limpio para devolverlo al navegador sin la contraseña
    const { password: _, ...userData } = user.toObject();
    res.json({ message: 'Usuario actualizado', user: userData });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
};

// 4. Eliminar un usuario de MongoDB
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};
