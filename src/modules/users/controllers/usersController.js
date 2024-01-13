/**
* Use imports here to model or others
*
*
*
* para a cli: criar um codigo que vc passa o nome da função e ele ja faz import e export automatico;
*/
import { UserCor } from "../core/userCore.js";


/**
 * constantes aqui
 */
const userProviders = new UserCor()

export const list = userProviders.list
export const postUser = userProviders.postUser
export const logInUserWithJwt =  userProviders.logUserjwt;
