// 参考规范实现 https://tc39.es/ecma262/#sec-parseint-string-radix
const stringToNumber = (str, radix) => {
    if (str === null || str === undefined) return NaN;
    // 1. Let inputString be ? ToString(string).
    if (typeof str !== 'string') str = String(str)

    // 2. Let S be ! TrimString(inputString, start).
    str = str.trim()
    // 3. Let sign be 1.
    let sign = 1;
    // 4. If S is not empty and the first code unit of S is the code unit 0x002D (HYPHEN-MINUS), set sign to -1.
    if (str.charCodeAt(0) === 0x002D) sign = -1;
    // 5. If S is not empty and the first code unit of S is the code unit 0x002B (PLUS SIGN) or the code unit 0x002D (HYPHEN-MINUS), remove the first code unit from S.
    let numberStart = 0;
    if (str.charCodeAt(numberStart) === 0x002D || str.charCodeAt(numberStart) === 0x002B) numberStart += 1;
    // 6. Let R be ? ToInt32(radix).
    let R = radix;
    // 7. Let stripPrefix be true.
    let stripPrefix = true;

    if (R === 0 || R === undefined) {
        // 9. Set R to 10.
        R = 10;
    } else {
        // 8. 
        // a.If R < 2 or R > 36, return NaN. 
        // b.If R ≠ 16, set stripPrefix to false.
        if (R && (R < 2 || R > 36)) return NaN
        if (R !== 16) stripPrefix = false;
    }

    // 10. If stripPrefix is true, then
    if (stripPrefix) {
        // If the length of S is at least 2 and the first two code units of S are either "0x" or "0X", then
        // Remove the first two code units from S.
        // Set R to 16.
        let prefix = str.slice(numberStart, numberStart + 2);
        if (prefix.toUpperCase() == '0X') {
            numberStart += 2;
            R = 16;
        }
    }

    // 11. If S contains a code unit that is not a radix-R digit, let Z be the substring of S consisting of all code units before the first such code unit; otherwise, let Z be S.
    const arr = []
    for (let i = numberStart; i < str.length; i++) {
        // 0-9为[48-57],A-F为[65-70]
        const charCode = str[i].toUpperCase().charCodeAt()
        if (charCode < 48) break;
        if (R <= 10 && charCode > 47 + R) break;
        if (charCode > (64 + R)) break;
        // 13. Let mathInt be the mathematical integer value that is represented by Z in radix-R notation, using the letters A-Z and a-z for digits with values 10 through 35
        let mathInt
        // 字符为[A-F]时, 实际数字为charCode -55
        if (charCode >= 65) mathInt = charCode - 55

        // 字符为[0-9]时, 实际数字为charCode - 48
        else mathInt = charCode - 48

        arr.push(mathInt)
    }

    const len = arr.length
    // 当实际数字数组长度为0时, 返回NaN
    if (!len) return NaN
    // 15. Let number be the Number value for mathInt.
    let result = 0
    // 依次解析实际数字数组, 组合成真正的数字
    for (let i = 0; i < len; i++) {
        const num = arr[i] * Math.pow(R, len - i - 1)
        result += num
    }

    // 算法匹配到的正负号
    return result * sign
}


console.log(stringToNumber("0xF", 16));
console.log(stringToNumber("F", 16));
console.log(stringToNumber("17", 8));
console.log(stringToNumber(021, 8));
console.log(stringToNumber("015", 10));
console.log(stringToNumber(15.99, 10));
console.log(stringToNumber("15,123", 10));
console.log(stringToNumber("FXX123", 16));
console.log(stringToNumber("1111", 2));
console.log(stringToNumber("15 * 3"));
console.log(stringToNumber("15e2", 10));
console.log(stringToNumber("15px", 10));
console.log(stringToNumber("12", 13));


console.log(stringToNumber("Hello", 8));
console.log(stringToNumber("22", 2));

console.log(stringToNumber("-F", 16));
console.log(stringToNumber("-0F", 16));
console.log(stringToNumber("-0XF", 16));
console.log(stringToNumber(-15.1, 10));
console.log(stringToNumber(" -17", 8));

console.log(stringToNumber(" -15", 10));
console.log(stringToNumber("-1111", 2));
console.log(stringToNumber("-15e1", 10));
console.log(stringToNumber("-12", 13));