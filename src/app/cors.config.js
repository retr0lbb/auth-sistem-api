import cors from "cors"

export default function Cors(){
    return cors({
        origin: "*",
        methods: "*",
    })
}