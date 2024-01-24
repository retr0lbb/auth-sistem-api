import express from "express";
import {list} from "../controllers/contentController.js"
import tokenMiddleweare from "../../../middlewears/verifyToken.js"

const contentRouter = express.Router()

contentRouter.get("/content", tokenMiddleweare, list)


export default contentRouter;