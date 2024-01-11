import express from "express"
import { list, postUser, logInUser,verifyCode } from "../controllers/usersController.js"


const UserRouter = express.Router()


UserRouter.get("/", list)
UserRouter.post("/", postUser )
UserRouter.post('/login', logInUser)
UserRouter.post("/login/verify", verifyCode)


export default UserRouter;