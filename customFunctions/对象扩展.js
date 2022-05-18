// instanceOf
function myInstanceOf(obj, source) {
    let proto = obj.__proto
    while (proto) {
        if (proto === source.protoType) {
            return true
        }
        proto = proto.__proto__
    }
    return false
}

// deepClone
function deepClone(source, map = new Map()) {
    if (typeof source === 'object' && source !== null) {
        let cache = map.get(source)
        if (cache) {
            return cache
        }
        let result = Array.isArray(source) ? [] : {}
        // 递归之前缓存起来
        map.set(source, result)
        for (let key in source) {
            result[key] = deepClone(source[key], map)
        }
        return result
    }
    else {
        return source
    }
}