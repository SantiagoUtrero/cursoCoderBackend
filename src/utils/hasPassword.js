import bcrypt from 'bcrypt';

//hashea la contra

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//valida la contra

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

export default createHash;