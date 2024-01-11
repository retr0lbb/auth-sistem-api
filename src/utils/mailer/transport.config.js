import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv()

const email = process.env.eu;

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user: process.env.eu,
        pass: process.env.ep
    },
    authMethod: 'LOGIN',
})
export default transport;
