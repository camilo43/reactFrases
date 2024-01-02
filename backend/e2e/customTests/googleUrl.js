
export function toStartWithFunction() {
    console.count("Se ha llamado el test------->>")
    expect.extend({
        toStartWith(value) {
            const valueToBeTested = value
            const matchingRegex = valueToBeTested.match(/^https:\/\/accounts.google.com\/o\/oauth2\/v2\/auth\?access_type=/);
    
            if(matchingRegex !== null){
                return {
                    message: "The URL is correct",
                    pass: true
                }
            }else{
                return {
                    message: "The URL is not what expected",
                    pass: false
                }
            }
        }
    })
}