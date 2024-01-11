
export default function generateCode(leng){
    const numberDic = "0123456789";
    let code = "";
    for(let i = 0; i< leng; i++){
        const randomIndex = Math.floor(Math.random() * numberDic.length)

        code += numberDic[randomIndex]
    }
    return code;
}