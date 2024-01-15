import express from "express"
import {logIn, verifyCodeFromEmail} from "../controllers/authController.js"

const router = express.Router()


router.post("/", logIn)
router.post("/2fa", verifyCodeFromEmail)


export default router