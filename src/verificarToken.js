import jwt from 'jsonwebtoken';

const verificarToker = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send({status: 'Error', message: 'Token no existente', code: 401});

    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        req.payload = payload;   
        next();
    } catch (error) {
        res.status(400).send({status: 'Error', message: 'Token incorrecto', code: 400});
    }
};

export default verificarToker;