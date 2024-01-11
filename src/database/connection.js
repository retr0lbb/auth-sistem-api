import * as mongoose from "mongoose" ;
import "dotenv/config"


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