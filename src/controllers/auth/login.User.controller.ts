import {prisma} from "../../lib/prisma";
import {Request, Response} from "express";
import {UserSchema} from "../../Schema/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export default async function loginUserController(req: Request, res: Response) {

            try {
                const user_valid  = UserSchema.safeParse(req.body);
                if (user_valid.error) {
                    return res.status(400).json({
                        message: "validation error check the fields",
                        status: false,
                    })
                }

                // confirm que el usurious exist en la db

                const confirm_user_db = await prisma.user.findFirst({
                    where: {
                        email: user_valid.data?.email,
                    }
                })

                if (!confirm_user_db) {
                    return res.status(401).json({
                        message: "unauthorized",
                        user: "not found",
                        status: false,
                    })
                }

                const confirm_password: boolean = bcrypt.compareSync(user_valid.data?.password, confirm_user_db.password);

                if (!confirm_password) {
                    return res.status(401).json({
                        message: "unauthorized, Invalid credentials",
                        status: false,
                    })
                }

                // creation the token of access

                if (!process.env.SECRET_AUTH_JWT) {
                     throw new Error('SECRET_AUTH_JWT no está define')
                }

                const JWT_SECRET = process.env.SECRET_AUTH_JWT


                const token: string = jwt.sign({id: confirm_user_db.id, email: confirm_user_db.email,
                    },
                    JWT_SECRET as string,
                    {
                    expiresIn: "1d",
                    }
                )

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 24 * 60 * 60 * 1000, // 1 día
                    path: '/'
                })


                res.status(200).json({
                    status: "success",
                    message: "Successful login",
                })

            }catch (error) {
                if (error instanceof Error) {
                  return   res.status(400).send({
                        message: "error occurred",
                        status: false,
                    })
                }
            }


}