function numberToString(number, radix) {
    if (radix > 36 || radix < 2) throw new Error('radix argument must be between 2 and 36')
    if (isNaN(number)) return 'NaN';
    if (number === 0) return '0';
    if (number < 0) return '-' + numberToString(-number);
    
    if (number === Infinity) return 'Infinity';
    if (!radix) radix = 10;

    let integer = Math.floor(number);
    let fraction = number - integer;

    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let str = '';
    do {
        let remainder = integer % radix;
        str = digits[remainder] + str;
        integer = (integer - remainder) / radix;
    }
    while (integer);

    return str;
}

console.log(numberToString(2e2, 10)) //科学计数法
console.log(numberToString(2e2, 2)) //科学计数法二进制
console.log(numberToString(15, 8)) //八进制
console.log(numberToString(15, 10)) // 十进制
console.log(numberToString(15, 16)) // 十六进制


console.log(numberToString(0b1111, 10)) // 二进制转十进制
console.log(numberToString(0b1111, 8)) // 二进制转八进制
console.log(numberToString(0b1111, 16)) // 二进制转十六进制

console.log(numberToString(16, 10)) //科学计数法