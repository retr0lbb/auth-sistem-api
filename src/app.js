import contentRouter from './modules/content/routes/contentRouter.js';
import UserRouter from './modules/users/routes/usersRouter.js';
import route from "./modules/auth/routes/authRouter.js"
import DatabaseConnect from './database/connection.js';
import express, { Router } from "express";
const app = express();
const connection = DatabaseConnect()

const port = 3000;
app.use(express.json());
app.use("/users", UserRouter);
app.use("/auth", route);
app.use("/protected", contentRouter);


app.get("/", (req, res)=>{
    res.send("Hello World");
})


app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});