import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import conexion from './database';
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));

//SETTINGS
app.set('port', process.env.PORT || 6000);

//ROUTES
import usuario from './routes/usuario';

app.use('/api', usuario);

//INITIALIZATION
const init = async () => {
    try {
        await app.listen(app.get('port'));
        console.log(`Conectado al servidor en el puerto ${app.get('port')}`);
        await conexion();
    } catch (error) {
        console.log(`No se pudo conectar al servidor`);
        console.log(`Error: ${error}`);
    }
}

init();