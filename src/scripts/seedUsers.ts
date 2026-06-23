import mongoose from 'mongoose';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const generateUsers = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sistema_auth';
    
    // 1. ABRIR CONEXIÓN CON MONGO LOCAL
    console.log('⏳ Conectando a MongoDB...');
    await mongoose.connect(mongoUri);

    // 2. Limpiar la base de datos
    await User.deleteMany();

    // 3. Generar 20 usuarios ficticios
    const users = Array.from({ length: 20 }, (_, i) => {
      const password = bcrypt.hashSync('password123', 10); // Contraseña estándar para todos
      return {
        nombre: `Usuario ${i + 1}`,
        email: `user${i + 1}@example.com`,
        password,
        rol: i % 2 === 0 ? 'admin' : 'user'
      };
    });

    // 4. Insertar usuarios
    await User.insertMany(users);
    console.log(`✅ Se crearon ${users.length} usuarios exitosamente`);

  } catch (error) {
    console.error(`❌ Error al crear usuarios: ${(error as Error).message}`);
  } finally {
    // 5. CERRAR CONEXIÓN Y APAGAR EL SCRIPT SEGURO
    await mongoose.disconnect();
    process.exit(0);
  }
};

generateUsers();
