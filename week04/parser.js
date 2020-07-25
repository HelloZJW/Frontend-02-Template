let current = null;
function emit(token){
    console.log(token);
}

const EOF = Symbol('EOF');

function data(c) {
    if (c === '<') {
        return tagOpen;
    } else if (c === EOF) {
        return;
    } else {
        return data;
    }
}

function tagOpen(c) {
    if (c === '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        return tagName(c);
    } else {
        return data;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]/)) {
        return tagName;
    } else if (c === '>') {

    } else if (c === EOF) {

    } else {

    }
}

// <div prop
function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        return tagName;
    } else if (c === '>') {
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '>') {
        return data;
    } else if (c === '=') {
        return beforeAttributeName;
    } else {
        return beforeAttributeName;
    }
}

// 自封闭标签
function selfClosingStartTag(c) {

}

module.exports = {
    parseHTML(html) {
        let state = data;
        for (const c of html) {
            state = state(c);
        }
        state = state('EOF');
    }
}