// call
function call(fn, ctx, ...args) {
    if([null, undefined].includes(ctx)) {
        ctx = globalThis
    }
    ctx.tmpFn = fn
    const res = ctx.tmpFn(...args)
    delete ctx.tmpFn
    return res
}

// 原型上实现call
Function.call = function (ctx, ...args) {
    if([null, undefined].includes(ctx)) {
        ctx = globalThis
    }
    ctx.tmpFn = this
    const res = ctx.tmpFn(...args)
    delete ctx.tmpFn
    return res
}

// apply
function apply(fn, ctx, args) {
    if([null, undefined].includes(ctx)) {
        ctx = globalThis
    }
    ctx.tmpFn = fn
    const res = ctx.tmpFn(args)
    delete ctx.tmpFn
    return res
}

// 原型上实现apply
Function.apply = function (ctx, args) {
    if([null, undefined].includes(ctx)) {
        ctx = globalThis
    }
    ctx.tmpFn = this
    const res = ctx.tmpFn(args)
    delete ctx.tmpFn
    return res
}

// bind
function bind(fn, ctx, ...args) {
    if([null, undefined].includes(ctx)) {
        ctx = globalThis
    }
    ctx.tmpFn = fn
    const res = ctx.tmpFn(args)
    delete ctx.tmpFn
    return function() {
        fn.call(ctx, ...args)
    }
}

// 原型上实现bind
Function.bind = function (ctx, args) {
    if([null, undefined].includes(ctx)) {
        ctx = globalThis
    }
    ctx.tmpFn = this
    const res = function() {
        ctx.tmpFn(args)
    }
    delete ctx.tmpFn
    return res
}

// 用apply实现bind
function bind(fn, ctx, args) {
    return function() {
        fn.apply(ctx, args)
    }
}

// 用call实现bind
function bind(fn, ctx, ...args) {
    return function() {
        fn.call(ctx, ...args)
    }
}