import express from "express"
import { list, postUser, logInUserWithJwt } from "../controllers/usersController.js"

const UserRouter = express.Router()

UserRouter.get("/", list)
UserRouter.post("/", postUser )
UserRouter.post('/login', logInUserWithJwt)




export default UserRouter;