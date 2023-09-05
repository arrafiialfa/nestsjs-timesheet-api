import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcryptjs";

@Injectable()
export class BcryptService {

    generatePassword(password: string) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    checkPassword(password: string, hash: string) {
        return bcrypt.compareSync(password, hash)
    }
}
