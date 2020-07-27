/**
 * 暴力算法：隐式的回退指针
 * @param {*} txt 
 * @param {*} pattern 
 */
function bfsearch(txt = '', pattern = '') {
    const txtLen = txt.length;
    const patternLen = pattern.length;
    if (patternLen > txtLen) return -1;
    for (let i = 0; i < txtLen - patternLen + 1; i++) {
        for (let j = 0; j < patternLen; j++) {
            if (txt[i + j] !== pattern[j]) break;
            if (j === patternLen - 1) {
                return i;
            }
        }
    }

    return -1;
}

console.log(bfsearch('abc', 'abcabx'));
console.log(bfsearch('aabccabx', 'abcabx'));
console.log(bfsearch('abcabcabx', 'abcabx'));
console.log(bfsearch('aaabcabxaa', 'abcabx'));

/**
 * 暴力算法，显示的回退指针
 * @param {*} txt 
 * @param {*} pattern 
 */
function bfsearch2(txt = '', pattern = '') {
    let i = 0, j = 0;
    let txtLength = txt.length;
    let patLength = pattern.length;
    while (i < txtLength && j < patLength) {
        if (txt[i] === pattern[j]) {
            j += 1;
        } else {
            i -= j; // 回退文本指针 i
            j = 0;  // 回退模式指针 j
        }
        i += 1;
    }
    if (j === patLength) return i - patLength;

    return -1;
}

// console.log(bfsearch2('abc', 'abcabx'));
// console.log(bfsearch2('aabccabx', 'abcabx'));
// console.log(bfsearch2('abcabcabx', 'abcabx'));
// console.log(bfsearch2('aaabcabxaa', 'abcabx'));

/**
 * 构建模式串的状态机
 * @param {*} pattern 
 */
function makeDFA(pattern = '') {

}
// def make_dfa():
// dfa = [{} for i in range(pat_len)]  # [state][in] => next state

// x, dfa[0][pat[0]] = 0, 1

// for j in range(1, pat_len):
//     for ch in pat:
//         dfa[j][ch] = dfa[x].get(ch, 0)
//     dfa[j][pat[j]] = j + 1
//     x = dfa[x].get(pat[j], 0)

// return dfa

// 这个状态机的状态就是模式指针，可能值为[0, len(pat)], 状态为 len(pat) 时，说明成功完成模式字符串的匹配
// 这个状态机 构建时 的输入是模式字符串中的字符，对于每一个状态来说，输入某一个字符后会转换为 下一个状态
// 这个状态机 运行时 的输入是文本字符串中的字符，我们根据输入的文本字符、当前状态和状态机来转换状态


// function buildDFA(pat = '') {
//     let R = 256;
//     let M = pat.length;
//     // dp[状态][字符] = 下个状态
//     let dp = Array.from(Array(M), () => new Array(R).fill(0))
//     // base case
//     dp[0][pat.charCodeAt(0)] = 1;
//     // 影子状态 X 初始为 0
//     let X = 0;
//     for (let j = 1; j < M; j++) {
//         for (let c = 0; c < R; c++) {
//             dp[j][c] = dp[X][c];
//         }
//         dp[j][pat.charCodeAt(j)] = j + 1;
//         // 更新影子状态
//         X = dp[X][pat.charCodeAt(j)];
//     }
//     return dp;
// }

function buildDFA(pat = '') {
    let M = pat.length;
    // dp[状态][字符] = 下个状态
    let dp = new Array(M);
    for (let i = 0; i < M; i++) {
        let obj = {};
        for (const ch of pat) {
            obj[ch] = 0;
        }
        dp[i] = obj;
    }
    // base case
    dp[0][pat.charAt(0)] = 1;
    // 影子状态 X 初始为 0
    let X = 0;
    for (let j = 1; j < M; j++) {
        for (let c = 0; c < pat.length; c++) {
            try {
                dp[j][pat.charAt(c)] = dp[X][pat.charAt(c)];
            } catch (error) {
                console.log(error)
            }
        }
        dp[j][pat.charAt(j)] = j + 1;
        // 更新影子状态
        X = dp[X][pat.charAt(j)];
    }
    return dp;
}

function matchWithDFA(txt = '', pattern = '') {
    const dp = buildDFA(pattern);
    let M = pattern.length;
    let N = txt.length;
    // pat 的初始态为 0
    let j = 0;
    for (let i = 0; i < N; i++) {
        // 计算 pat 的下一个状态
        j = dp[j][txt.charAt(i)];
        // 到达终止态，返回结果
        if (j == M) return i - M + 1;
    }
    // 没到达终止态，匹配失败
    return -1;
}

console.log('dfa', matchWithDFA('abc', 'abcabx'));
console.log('dfa', matchWithDFA('aabccabx', 'abcabx'));
console.log('dfa', matchWithDFA('abcabcabx', 'abcabx'));
console.log('dfa', matchWithDFA('aaabcabxaa', 'abcabx'));
console.log('dfa中文', matchWithDFA('啊把擦啊把擦啊把x', '啊把擦啊把x'));
console.log('dfa中文', matchWithDFA('啊啊啊把擦啊把x啊啊', '啊把擦啊把x'));

