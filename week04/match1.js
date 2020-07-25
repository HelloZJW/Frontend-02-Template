function match(string) {
    const len = 6;
    if (typeof string !== 'string' || string.length < len) return -1;
    let state = new Array(len).fill(false);
    function clearState(index) {
        for (let i = 0; i < state.length; i++) {
            if (i > index) state[i] = false;
        }
    }
    for (let i = 0; i < string.length; i++) {
        let c = string[i];
        if (c === 'a') {
            state[0] = true;
            clearState(0);
        } else if (state[0] && c === 'b') {
            state[1] = true;
            clearState(1);
        } else if (state[1] && c === 'c') {
            state[2] = true;
            clearState(2);
        } else if (state[2] && c === 'd') {
            state[3] = true;
            clearState(3);
        } else if (state[3] && c === 'e') {
            state[4] = true;
            clearState(4);
        } else if (state[4] && c === 'f') {
            return i - 5;
        }
        else {
            state.fill(false);
        }
    }

    return -1;
}

console.log(match('aaabcdef3'));