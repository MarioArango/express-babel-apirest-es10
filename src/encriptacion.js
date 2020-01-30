import bcrypt from 'bcryptjs';

const encriptar = {};

encriptar.password = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptado = await bcrypt.hash(password, salt);
    return passwordEncriptado;
};

encriptar.verificar = async (password, passwordEncriptado) => {
    const verificador = await bcrypt.compare(password, passwordEncriptado);
    return verificador;
};

encriptar.decodificar = async (passwordEncriptado) => {
    const password = await bcrypt.decode(passwordEncriptado);
    return password;
};

export default encriptar;