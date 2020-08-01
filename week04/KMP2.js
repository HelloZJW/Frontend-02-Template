function getNext(pat = '') {
    let M = pat.length;
    let next = new Array(M);
    next[0] = -1;
    let k = -1;
    for (let i = 1; i < M; i++) {
        while (k != -1 && pat[k + 1] != pat[i]) {
            k = next[k];
        }
        if (pat[k + 1] === pat[i]) {
            k++;
        }
        next[i] = k;
    }

    return next;
}

// k = next[k]
// 因为前一个的最长串的下一个字符不与最后一个相等，需要找前一个的次长串，问题就变成了求0到next(k)的最长串，如果下个字符与最后一个不等，继续求次长串，也就是下一个next(k)，直到找到，或者完全没有

// 终于看明白了，感觉设置了很多干扰项。其实用迭代思想解释就能理解了。
// 这个算法本质是找相等的最长匹配前缀和最长匹配后缀。
// 有两种情况，
// （1）如果b[i-1]的最长前缀下一个字符与b[i]相等，则next[i]=next[i-1]+1.
// （2）如果不相等，则我们假设找到b[i-1]的最长前缀里有b[0,y]与后缀的子串b[z,i-1]相等，然后只要b[y+1]与b[i]相等，那么b[0,y+1]就是最长匹配前缀。这个y可以不断的通过迭代缩小就可以找到

getNext('ababacd')