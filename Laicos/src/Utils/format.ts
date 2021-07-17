

export const formatter = (number: number): string => {
    let result: string = ""
    let n = number
    while (n > 0) {
      
        let unit = n % 10
        result = unit + result
        if (result.replace(",","").length % 3 === 0) {
            result = "," +result
        }
        n = Math.floor(n/10)
    }   
    if (result[0] === ",") result = result.substring(1)
    return result

}
