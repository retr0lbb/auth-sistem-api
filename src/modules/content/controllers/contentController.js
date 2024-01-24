/**
* Use imports here to model or others
*/
import userSchema from "../../users/models/Usermodel.js"

export const list = async (req, res)=>{
    try {
        const userId = req.userId

        if(!userId){
            return res.send("por favor se autentique para poder usar nosso serviços")
        }

        const user = await userSchema.findById(userId.id)
        if(!user){
            return res.status(404).send("Usuario não encontrado")
        }
        res.send({user: user})
    } catch (error) {
        if(error){
            res.status(500).send("Erro no servidor")
        }
    }
}