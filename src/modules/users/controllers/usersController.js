/**
* Use imports here to model or others
*
*
*
* para a cli: criar um codigo que vc passa o nome da função e ele ja faz import e export automatico;
*/
import userSchema from "../models/Usermodel.js";
import checkSulfix from "../../../utils/checkEmailSulfix.js";
import { handleError } from "../../../utils/error/errorHandler.js";
import jwt from "jsonwebtoken";
import {configDotenv} from "dotenv"
import sendEmail from "../../../utils/mailer/mailer.js";
import generateCode from "../../../utils/generateCode.js";
configDotenv()


/**
 * constantes aqui
 */

const emaiVerificationCode = new Map()

export const list = async (req, res)=>{
    try {
        const users = await userSchema.find()

        res.status(200).json({users})
    } catch (error) {
        handleError(error, res)
    }
}


export const postUser = async (req, res)=>{
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

export const logInUser = async(req, res) =>{
    
    const { email, pass } = req.body
    try{
        const user = await userSchema.findOne({email: email})
        if(!user){
            return res.status(404).send("Usuario não encontrado")
        }


        const verificatioCode = generateCode(12)
        emaiVerificationCode.set(email, verificatioCode)
        if(pass === user.pass){
            const token = jwt.sign( {email} , process.env.TOKEN_SECRETE, { expiresIn: '1h' });
            const info = sendEmail(email, verificatioCode)
            res.json({access_token: token})
        }


    }catch (error){
       handleError(error, res)
    }
}

export const verifyCode = async(req, res)=>{
    const {email, code} = req.body
    try {
        if(!email || !code){
            return res.status(402).send("email and code must be provided")
        }

        const storedCode = emaiVerificationCode.get(email)

        if(!storedCode || storedCode !== code){
            return res.status(401).json({ error: "Código de verificação inválido." });
        }
        
        res.json({ message: "Autenticação bem-sucedida. indo para o conteudo" });

    } catch (error) {
        handleError(error, res)
    }
}