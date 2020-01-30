import Joi from '@hapi/joi';

const validacion = {};

validacion.usuario = async (usuario) => {
    const usuarioSchema = Joi.object({
        nombre: Joi.string().max(20).required(),
        apellido: Joi.string().max(20).required(),
        email: Joi.string().max(100).required().email(),
        nick: Joi.string(),
        password: Joi.string().min(6).required(),
        nivel: Joi.string().required()
    });

    const error = await usuarioSchema.validate(usuario);
    return error;
};

export default validacion;

