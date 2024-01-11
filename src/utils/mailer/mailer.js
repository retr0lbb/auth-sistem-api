import { handleError } from "../error/errorHandler.js";
import transport from "./transport.config.js";
import "dotenv/config.js"


export default async function sendEmail(mailTo, code){
    const info = await transport.sendMail({
        from: process.env.eu,
        to: mailTo,
        subject: "Login code",
        html: `<b>Codigo de login: ${code}</b>`
    }).catch((err)=>{
        handleError(err);
    })
    return info
}