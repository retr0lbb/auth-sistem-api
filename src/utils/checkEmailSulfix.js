export default function checkSulfix(email){
    const regex = /@(gmail\.com|hotmail\.com)$/
    return regex.test(email)
}