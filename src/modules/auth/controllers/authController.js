/**
* Use imports here to model or others
*/
import { authCore } from "../core/auth.core.js"

const auth = new authCore()

export const logIn = auth.LoginAndGenerateCode.bind(auth)
export const verifyCodeFromEmail = auth.verifyCodeFromEmail.bind(auth)

