import Usuario from '../models/Usuario';
import validacion from '../validaciones';
import encriptar from '../encriptacion';
import jwt from 'jsonwebtoken';

const usuarioControler = {};


usuarioControler.registrarse = async (req, res) => {   

    const { error }  = await validacion.usuario(req.body);

    if(error) return res.status(400).send({status: 'Error', menssage: error.details[0].message , code: 400});

    const usuarioExistente = await Usuario.findOne({email: req.body.email});
    if(usuarioExistente) return res.status(400).send({status: 'Error', menssage: 'Email existente', code: 400});

    const passwordEncriptado = await encriptar.password(req.body.password);

    const usuario = new Usuario({...req.body, password: passwordEncriptado});

    try {
        await usuario.save();
        res.status(200).send({status: 'Succeful', menssage: 'Usuario registrado', code: 200});
    } catch (error) {
        res.status(400).send({status: 'Error', menssage: 'Usuario no registrado', code: 400});
    };
};

usuarioControler.logearse = async (req, res) => {

    const { email, password } = req.body;
    
    const usuario = await Usuario.findOne({email});

    if(!usuario) return res.status(400).send({status: 'Error', menssage: 'Email no existe', code: 400});
    
    const verificador = await encriptar.verificar(password, usuario.password);

    if(!verificador) return res.status(400).send({status: 'Error', menssage: 'Password incorrecto', code: 400});
    
    const token = jwt.sign({id: usuario._id}, process.env.TOKEN_SECRET);

    res.status(200).header('auth-token', token).send({status: 'Succeful', menssage: 'Password correcto', code: 200, token});

};

usuarioControler.recuperarPassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({email});
    if(!usuario) return res.status(400).send({status: 'Error', menssage: 'Email no existe', code: 400});
    const passwordDesencriptado = await encriptar.decodificar(usuario.password);
    console.log(passwordDesencriptado);
    
};

usuarioControler.listar = (req, res) => {
    const { payload } = req
    console.log(payload);
    
    res.status(200).send({status: 'Succes', menssage: 'ingreso correcto', code: 200});
};

export default usuarioControler;