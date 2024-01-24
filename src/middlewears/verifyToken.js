import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()



export default function tokenMiddleweare(req, res, next){
    const token = req.headers["authorization"];
    try {

        if(!token){return res.status(400).send("invalid auth method")}
        const tokenValue = token.replace("Bearer ", "")
        if(!tokenValue){
            return res.status(401).send("Invalid or missing token")
        }

        jwt.verify(tokenValue, process.env.TOKEN_SECRETE, (err, decoded) => {
            if(err){
                res.status(403).send("Invalid Token");
                return
            }

            req.userId = decoded;
            next();
        })

    } catch (error) {
        if(error){
            res.status(500).send("Server error")
            throw error
        }
    }
}