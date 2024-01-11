export function handleError(error, res){
    if(error){
        console.error(error)
    }
    if(res){
        res.status(500).send("Erro no servidor interno")
    }
    return;
}