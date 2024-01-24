/**
* Use imports here to model or others
*/
import { AuthCore } from "../core/auth.core.js"

const auth = new AuthCore()

export const logIn = auth.LoginAndGenerateCode.bind(auth)
export const verifyCodeFromEmail = auth.verifyCodeFromEmail.bind(auth)

