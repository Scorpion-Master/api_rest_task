import jwt, { JwtPayload } from "jsonwebtoken"
import {Request, Response, NextFunction} from "express"

export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try {
        const token: string | undefined = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
                status: false,
            })
        }

        const SECRET_AUTH = process.env.SECRET_AUTH_JWT

        if (!SECRET_AUTH) {
            return res.status(500).json({
                message: "Internal auth error",
            })
        }

        const decoded = jwt.verify(token, SECRET_AUTH) as JwtPayload

        // 👇 Guardamos el usuario para usarlo después
        req.user = {
            id: decoded.id as number,
            email: decoded.email as string,
        }

        next()
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido o expirado",
            status: false,
        })
    }
}
