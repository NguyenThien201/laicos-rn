

export const formatter = (number: number): string => {
    let result: string = ""
    let isSign: boolean = false
   
    let n = number
    const re = new RegExp(',', 'g');
   
    if (number < 0)
    {
        n *= -1
        isSign = true
    }
    else if(n<10)
    {
        return n+""
    }
    while (n > 0) {
      
        let unit = n % 10
        result = unit + result
        if (result.replace(re,"").length % 3 === 0) {
            result = "," +result
        }
        n = Math.floor(n/10)
    }   
    if (result[0] === ",") result = result.substring(1)
    if (isSign) result = "-" + result
    return result

}
