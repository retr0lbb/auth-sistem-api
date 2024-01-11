import express from "express"
import {list}  from "../controllers/authController.js"

const router = express.Router()


router.get("/auth", list)


export default router