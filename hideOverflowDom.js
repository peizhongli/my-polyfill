/**
 * @file 设置超出容器的dom自动隐藏
 * @date 2022-03-10
 */

export default () => {
    return {
        mounted() {
            this.rootObserverMap = new Map();
        },
        methods: {
            $setHiddenEl(elements) {
                if (Array.isArray(elements)) {
                    elements.forEach(el => {
                        this.hiddenElement(el);
                    });
                    return;
                }
                this.hiddenElement(elements);
            },

            hiddenElement(el) {
                if (!el) {
                    return;
                }
                // 兼容 iOS12 以下不支持 IntersectionObserver API
                if (!window.IntersectionObserver) {
                    this.hiddenByRect(el);
                }
                else {
                    this.hiddenByObserver(el);
                }
            },
            hiddenElementByRect(el) {
                const rootRect = el.getBoundingClientRect();
                const childNodes = el.children || [];
                // 倒序遍历
                for (let i = childNodes.length - 1; i >= 0; i--) {
                    const eleRect = childNodes[i].getBoundingClientRect();
                    // 如果右边界在父元素右边界的左侧，说明这个元素之前的每个元素都是完整露出的
                    if (eleRect.right <= rootRect.right) {
                        break;
                    }
                    childNodes[i].style.display = 'none';
                }
            },
            hiddenByObserver(el) {
                const wrapperRealWidth = el.scrollWidth;
                const wrapperWidth = el.offsetWidth;
                // 没溢出不需要关注
                if (wrapperRealWidth <= wrapperWidth) {
                    return;
                }
                let intersectionObserver = this.rootObserverMap.get(el);
                // 只初始化一次
                if (!intersectionObserver) {
                    // 根元素用wrapper，用document的话会在滑出视口以后导致元素隐藏
                    const options = {root: el};
                    intersectionObserver = new IntersectionObserver((entries) => {
                        if (entries && entries.length) {
                            entries.forEach(i => {
                                // 安卓下完整显示出的元素貌似大于99%，但小于1，这里用小于0.99来判断吧
                                if (i.intersectionRatio < 0.99) {
                                    i.target.style.display = none;
                                }
                            });
                        }
                    }, options);
                    // 缓存当前intersectionObserver
                    this.rootObserverMap.set(el, intersectionObserver);
                }
                el.children?.forEach(i => intersectionObserver.observe(i));
            }
        },
        destoryed() {
            // 销毁，防止内存溢出
            this.rootObserverMap.forEach((rootObserve) => {
                rootObserve && rootObserve.disconnect();
            });
            this.rootObserverMap.clear();
        }
    };
};