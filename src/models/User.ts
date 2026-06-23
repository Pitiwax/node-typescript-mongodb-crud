import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  rol: string;
  fechaCreacion: Date;
}

const userSchema = new Schema<IUser>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, default: 'user' },
  fechaCreacion: { type: Date, default: Date.now },
});

// Pre-save hook to hash password
// Pre-save hook to hash password (Versión Moderna Async/Await)
userSchema.pre('save', async function (this: IUser) {
  if (!this.isModified('password')) return;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  } catch (error: any) {
    throw error;
  }
});

export const User = model<IUser>('User', userSchema);