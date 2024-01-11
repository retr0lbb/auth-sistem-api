import * as mongoose from "mongoose" ;
import { configDotenv } from "dotenv";
configDotenv()


let connection;

function DatabaseConnect(){
    if(connection){
        return connection;
    }
    try {
        connection = mongoose.connect(process.env.MONGOURI)
        console.log("conectado a base de dados")
        return connection;
    } catch (error) {
        if(error){
            console.log(error)
        }
    }    
}

export default DatabaseConnect