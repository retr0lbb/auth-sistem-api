import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv";
configDotenv()

export default function verifyToken(req, res, next){
    const token = req.headers["authorization"];

    if(!token){
        return res.status(403).send("Login must be provided")
    }
    jwt.verify(token.replace('Bearer ', ''), process.env.TOKEN_SECRETE, (err, decote)=>{
        if (err) {
            console.log(err.name)
            // Se houver um erro na verificação do token, trata o erro e envia uma resposta apropriada
            if (err.name === 'JsonWebTokenError') {
              return res.status(401).send("Invalid token");
            } else if (err.name === 'TokenExpiredError') {
              return res.status(401).send("Token expired");
            } else {
              return res.status(500).send("Internal Server Error");
            }
        }
        req.email = decote.email;
        next();
    })



}