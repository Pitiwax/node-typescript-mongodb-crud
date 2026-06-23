import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import authMiddleware from './middlewares/auth';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

// 1. CONEXIÓN OBLIGATORIA A MONGO DB LOCAL
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sistema_auth';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB local exitosamente'))
  .catch((err) => console.error('❌ Error crítico al conectar a MongoDB:', err));

// Configurar rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Ruta raíz opcional
app.get('/', (req, res) => {
  res.send('API está corriendo');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
