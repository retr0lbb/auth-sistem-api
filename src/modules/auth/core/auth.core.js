import { handleError } from "../../../utils/error/errorHandler.js";
import generateCode from "../../../utils/generateCode.js";
import userSchema from "../../users/models/Usermodel.js";

export class authCore{
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
                return res.send("senha incorreta")
            }

            this.code = generateCode(6)
            return res.send(`UserLoged passing to code ${ this.code}`)


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
                this.tryAtenpts -= 1
                if(this.tryAtenpts<= 0){
                    res.status(400).send("Maximo de tentativas atingidas reiniciando o codigo")
                    this.code = ""; 
                    this.tryAtenpts = 5;
                    return;
                }
                res.status(401).send(`Codes did not match code1 ${this.code} code2 ${code} remaining: ${this.tryAtenpts} atenpts`)
                return;
            }
            res.send("code match go to hell 😼")
        } catch (error) {
            handleError(error, res)
        }
    }

}