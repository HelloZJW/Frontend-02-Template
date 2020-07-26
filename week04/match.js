/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    if (p.length > s.length) return false;
    if (p === s) return true;
    // 正则对应状态机的描述
    const map = {};
    // 初始状态
    let index = 0;
    for (const token of p) {
        map[index] = {};
        map[index][token] = true;
        index++;
    }
    // 最大的index，就是状态机的最终状态
    const BINGO = index;
    // 当前最高识别的位数
    let state = 0;
    for (let i = 0; i < s.length; i++) {
        let newState = 0;
        const token = s[i];
        if (map[state][token]) newState = state + 1;
        if (newState === BINGO) return true;
        state = newState;
    }
    return false;
};

console.log(isMatch('abc', 'abcabx'));
console.log(isMatch('aabccabx', 'abcabx'));
console.log(isMatch('abcabcabx', 'abcabx'));
console.log(isMatch('aaabcabxaa', 'abcabx'));


// function isMatch(string, p) {
//     for (let i = 0; i < string.length; i++) {
//         let j = 0;
//         while(string[i+j] === p[j]){
//             j++;
//             if(j === p.length) return true;
//         }
//     }

//     return false;
// }