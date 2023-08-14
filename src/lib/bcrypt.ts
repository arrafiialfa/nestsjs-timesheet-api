// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as bcrypt from 'bcryptjs';

export const generatePassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const checkPassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    generatePassword,
    checkPassword
}