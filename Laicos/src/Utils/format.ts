export const formatter = (number: number): string => {
	let result: string = "";
	let isSign: boolean = false;
	let n = Math.floor(number);
	const re = new RegExp(",", "g");
	let decimal_part = Math.floor((number - n) * 100);
	if (number < 0) {
		n *= -1;
		isSign = true;
	} else if (n < 10) {
		return n + "";
	}
	while (n > 0) {
		let unit = n % 10;
		result = unit + result;
		if (result.replace(re, "").length % 3 === 0) {
			result = "," + result;
		}
		n = Math.floor(n / 10);
	}
	if (result[0] === ",") result = result.substring(1);
	if (isSign) result = "-" + result;
	if (decimal_part > 0)
		return result + "." + decimal_part;
	else 
		return result
};

export function toCommas(value: number): string {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
