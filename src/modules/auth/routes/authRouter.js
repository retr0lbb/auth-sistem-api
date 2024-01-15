import express from "express"
import {logIn, verifyCodeFromEmail} from "../controllers/authController.js"

const router = express.Router()


router.post("/", logIn)


export default router