**在mounted的时候调接口会有什么问题？**

*页面可能会闪动*

**生命周期顺序**

*props-data-computed-watch*

**父子组件生命周期顺序**

*父组件初始化-父组件渲染-子组件初始化-子组件渲染-子组件挂载完-父组件挂载完*
*挂载阶段：父组件-beforecreated-父组件created-父组件beforeMount-父组件render-子组件beforeCreate-子组件created-子组件beforMount-子组件render-子组件mounted-父组件mounted*
*更新阶段：父组件beforeUpdate-子组件beforeUpdate-子组件updated-父组件updated*
*销毁阶段：父组件beforeDestroy-子组件beforeDestroy-子组件destroyed-父组件-destroyed*

*可以通过eventBus来监听父组件挂载完*

**打包优化**
*路由懒加载*
*异步组件*

**axios拦截器原理**
*解析use内的方法，定义Promise数组，把请求拦截放在最前面，响应拦截放到最后面，最后链式调用*

**Vue渲染优先级**
*el < template < render*