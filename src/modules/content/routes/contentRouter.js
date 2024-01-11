import express from "express";
import {list} from "../controllers/contentController.js"
import verifyToken from "../../../utils/verifyToken.js";

const contentRouter = express.Router()

contentRouter.get("/content", verifyToken, list)


export default contentRouter;