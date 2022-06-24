import bcrypt from 'bcryptjs';
import { Request } from 'express';
import { Users } from '../../interfaces/user.interface';

export const checkIfValidPassword = (req: Request, user: any) => {
   return bcrypt.compareSync(
        req.body.user.password,
        user.password
    )
}