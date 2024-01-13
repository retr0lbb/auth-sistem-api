import cors from "cors"

const corsOptions = {
    origin: "*"
}

export default function Cors(){
    return cors(corsOptions)
}