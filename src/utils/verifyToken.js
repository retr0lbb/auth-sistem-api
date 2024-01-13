import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv";
configDotenv()

export default function verifyToken(req, res, next){
    const token = req.headers["authorization"];

    if(!token){
        return res.status(403).send("Login must be provided")
    }

    jwt.verify(token.replace('Bearer ', ''), process.env.TOKEN_SECRETE, (err, decote)=>{
        req.email = decote.email;
        next();
    })



}