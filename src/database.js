import { connect } from 'mongoose';

const conexion = async () => {
    try{
        const conexionDB = await connect(
            process.env.URL_DATABASE,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log(`Conectado a MongoDB`);
    return conexionDB;
    }catch(error){
        console.log(`No conectado a MongoDB`);
        console.log(`Error: ${error}`);    
    }
}

export default conexion;
