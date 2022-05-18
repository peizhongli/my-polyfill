function reverseStr(str) {
    return str?.split('')?.reverse()?.join('');
}

function palindrome(str) {
    return str?.split('')?.reverse()?.join('') === str;
}
