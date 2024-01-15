import { handleError } from "../../../utils/error/errorHandler.js";
import generateCode from "../../../utils/generateCode.js";
import userSchema from "../../users/models/Usermodel.js";

export class authCore{
    code;

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
            if(!this.code){
                return("No coded provided")
            }
        } catch (error) {
            handleError(error, res)
        }
    }

}