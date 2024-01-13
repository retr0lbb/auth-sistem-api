import userSchema from "../models/Usermodel.js";
import { handleError } from "../../../utils/error/errorHandler.js";
import jwt from "jsonwebtoken";
import {configDotenv} from "dotenv"
import checkSulfix from "../../../utils/checkEmailSulfix.js";

configDotenv()

export class UserCor{
    

    async list(req,res){
        try {
            const users = await userSchema.find()
            res.status(200).json({users})
        } catch (error) {
            handleError(error, res)
        }
    }

    async postUser(req, res){
        const {name, email, pass} = req.body;
    try {
        if(!name || !email || !pass){
            res.send("All the informations needs to be provided");
            return;
        }
        if(checkSulfix(email) === false){
            res.status(401).send("Invalid Email Format")
            return
        }

        const user = new userSchema({
            name: name,
            email: email,
            pass: pass
        })
        await user.save()
        res.status(200).json({Message: "Usuario Salvo com sucesso", User: user})
        
    } catch (error) {
        handleError(error, res)
    }
    }

    async logUserjwt(req, res){
        const { email, pass } = req.body

    try{
        const user = await userSchema.findOne({email: email})
        if(!user){
            return res.status(404).send("Usuario não encontrado")
        }
        if(pass !== user.pass){
            return res.status(400).send("senhas não batem")
        }

        const token = jwt.sign( {email} , process.env.TOKEN_SECRETE, { expiresIn: '5h' });
        res.json({access_token: token})
        

    }catch (error){
       handleError(error, res)
    }
    }
}