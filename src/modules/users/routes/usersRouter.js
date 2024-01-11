import express from "express"
import { list, postUser, logInUser } from "../controllers/usersController.js"


const UserRouter = express.Router()


UserRouter.get("/", list)
UserRouter.post("/", postUser )
UserRouter.post('/login', logInUser)


export default UserRouter;