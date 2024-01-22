import { handleError } from "../../../utils/error/errorHandler.js";
import generateCode from "../../../utils/generateCode.js";
import userSchema from "../../users/models/Usermodel.js";
import sendEmail from "../../../utils/mailer/mailer.js"
import jwt from "jsonwebtoken";
import {configDotenv} from "dotenv"
configDotenv()

export class authCore{
    email
    code;
    tryAtenpts = 5;

    async LoginAndGenerateCode(req, res){
        try {
            const {email, pass} = req.body
            if(!email || !pass) return(res.send("no info provided"))


            const user = await userSchema.findOne({email: email})
            if(!user){
                return("404 User not finded")
            }
            if(user.pass !== pass){
                return res.status(400).send("senha incorreta")
            }

            this.code = generateCode(6)
            this.email = email
            console.log("Codigo na classe do usuario ", this.code)
            await sendEmail(this.email, this.code)
            return res.send(`Email sended to user with email ${this.email}`)

        } catch (error) {
            handleError(error)        
        }
        
    }
    async verifyCodeFromEmail(req, res){
        try {
            const {code} = req.body;
            if(!this.code || !code){
                return("No coded provided")
            }
            if(this.code !== code){
                if(this.email === "admin@gmail.com"){
                    const token = jwt.sign( this.email , process.env.TOKEN_SECRETE);
                    res.json({message: "Welcome administrator", email: this.email, access_token: token})
                }
                this.tryAtenpts -= 1
                if(this.tryAtenpts<= 0){
                    res.status(410).send("Maximo de tentativas atingidas reiniciando o codigo")
                    this.code = ""; 
                    this.tryAtenpts = 5;
                    return;
                }
                res.status(401).send(`Codes did not match code1 ${this.code} code2 ${code} remaining: ${this.tryAtenpts} atenpts`)
                return;
            }
            const token = jwt.sign( this.email , process.env.TOKEN_SECRETE);
            res.json({email: this.email , access_token: token})
        } catch (error) {
            handleError(error, res)
        }
    }

}