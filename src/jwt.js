import jwt from 'jsonwebtoken';
import usuarioControler from './controllers/usuarioControler';


jwt.sign({id: usuario._id}, process.env.TOKEN_SECRET);
