// 防抖：频繁onclick、inputchange、onscroll、onresize
// 密集事件触发，只执行靠后的事件（最后一次才进行函数调用）
function debounce(fn, delay = 200, immediate = false) {
    let timer = null
    return function () {
        // 修正this指向
        let ctx = this
        let args = arguments
        timer && clearTimeout(timer)
        if (immediate) {
            if (!timer) {
                fn.apply(ctx, args)
            }
            timer = setTimeout(function () {
                timer = null
            }, delay);
        }
        else {
            timer = setTimeout(function () {
                // 修正入参
                fn.apply(ctx, args)
            }, delay)
        }
    }
}


// 节流：onscroll、mouseover
// 在某个时间內，函数只能被触发一次（按照一定频率）
function throttle(fn, interval = 200, trailing) {
    let prev = 0
    let timer = null
    return function () {
        let ctx = this
        let args = arguments
        let now = +Date.now()
        if (now - prev > interval) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            fn.apply(ctx, args)
            prev = now
        }
        else if (!timer && trailing) {
            timer = setTimeout(function () {
                fn.apply(ctx, args)
                timer = null
            }, interval)
        }
    }
}