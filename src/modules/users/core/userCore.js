import userSchema from "../models/Usermodel.js";
import { handleError } from "../../../utils/error/errorHandler.js";
import jwt from "jsonwebtoken";
import {configDotenv} from "dotenv"
import checkSulfix from "../../../utils/checkEmailSulfix.js";

configDotenv()

export class UserCor extends userSchema{
    

    async list(req,res){
        try {
            const users = await userSchema.find()
            res.status(200).json({users})
        } catch (error) {
            handleError(error, res)
        }
    }

    async postUser(req, res){
        const {name, email, pass, birth} = req.body;
    try {
        if(!name || !email || !pass || !birth){
            res.send("All the informations needs to be provided");
            return;
        }
        if(checkSulfix(email) === false){
            res.status(401).send("Invalid Email Format")
            return
        }

        const user = new userSchema({
            birth: birth,
            email: email,
            name: name,
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
        const userId = user._id
        console.log(userId)

        const token = jwt.sign( {userId} , process.env.TOKEN_SECRETE);
        res.json({access_token: token})
        

    }catch (error){
       handleError(error, res)
    }
    }
}