import { Schema, model } from 'mongoose';

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        max: 20,
        required: true
    },
    apellido: {
        type: String,
        max: 20,
        required: true
    },
    email: {
        type: String,
        max: 100,
        unique: true,
        required: true
    },
    nick: {
        type: String,
        default: 'newusuario',
        required: false
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    nivel: {
        type: String,
        enum: ['basico', 'intermedio', 'avanzado'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default model('Usuario', usuarioSchema);