import bcrypt from 'bcryptjs';
import { Request } from 'express';

export const checkIfValidPassword = (req: Request, user: any) => {
   return bcrypt.compareSync(
        req.body.user.password,
        user.password
    )
}