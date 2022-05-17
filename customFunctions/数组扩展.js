// map
// todo 异步
function map(arr, callback) {
    let result = []
    for(let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i], i, arr))
    }
    return result
}

// reduce
// todo 异步
function reduce(arr, callback, init = []) {
    let result = init
    for(let i = 0; i < arr.length; i++) {
        result = callback(result, arr[i], i, arr)
    }
    return result
}

// filter
// todo 异步
function filter(arr, callback) {
    let result = []
    for(let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            result.push(arr[i])
        }
    }
    return result
}

// find
// todo 异步
function find(arr, callback) {
    let result = undefined
    for(let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            result = arr[i]
            break
        }
    }
    return result
}

// findIndex
// todo 异步
function findIndex(arr, callback) {
    let result = -1
    for(let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            result = i
            break
        }
    }
    return result
}

// every
// todo 异步
function every(arr, callback) {
    for(let i = 0; i < arr.length; i++) {
        if (!callback(arr[i], i, arr)) {
            return false
        }
    }
    return true
}

// some
// todo 异步
function some(arr, callback) {
    for(let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            return true
        }
    }
    return false
}

// flat
// a = [1,[1,[3,4,[5]],3],2]
function flat(arr) {
    let result = []
    for(let i = 0; i < arr.length; i++) {
        result = result.concat(
            Array.isArray(arr[i])
            ? flat(arr[i])
            : arr[i]
        )
    }
    return result
}
