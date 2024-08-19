import { NextFunction,Request,Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Expess {
    interface Request {
      userId?:string;
    }
  }
}

const verifyToken = (req:Request,res:Response,next:NextFunction) => {
    const token = req.cookies["auth_token"];
    console.log(req)
    if(!token){
        return res.status(401).send({message:"Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY as string);
        (req as any).userId = (decoded as JwtPayload).userId;
        next();
    } catch (error) {
        return res.status(401).send({message:"Unauthorized"})

    }

}

export default verifyToken;