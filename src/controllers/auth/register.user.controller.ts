import {prisma} from "../../lib/prisma";
import { Request, Response} from "express";
import bcrypt from "bcryptjs";
import {UserSchema} from "../../Schema/schema";


export default async function registerUserController(req: Request, res: Response){

    try {
    const user = UserSchema.safeParse(req.body);

    if (user.error) {
        return res.status(401).json({
            message: "Validation error. Please confirm the fields and try again.",
            status: false,
        })
    }

    // validator si el usurious exit en la db

        const valid_user_db = await prisma.user.findFirst({
            where: {
                email : user.data?.email
            }
        })
        if (valid_user_db) {
            return res.status(400).json({
                message: "The user trying to create already exists.",
                status: false,
            })
        }

        const hashPassword = bcrypt.hashSync(user.data?.password,10);

            const data =[
                {
                    name: user.data?.name,
                    email: user.data?.email,
                    password: hashPassword
                }
            ];

            const userResul = await prisma.user.createMany({
                data
            })


    //console.log(user_data);

    res.status(201).json({
        success: true,
        data: userResul,
        message: 'User registered successfully'
    });



    }catch (error) {
        if (error instanceof Error){

            console.error(error);

            res.status(400).json({
                error: "Something went wrong",
                status: false

            })
        }
    }
}