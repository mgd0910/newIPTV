import Toast from '../views/component/toast'
export default {
    install(Vue, options = {}) {
        const VueToast = Vue.extend(Toast)
        let toast = null
        function $toast(params) {
            return new Promise(resolve => {
                if (!toast) {
                    toast = new VueToast()
                    toast.$mount()  //手动挂载
                    document.querySelector(options.container || 'body').appendChild(toast.$el)
                }
                console.log('plugin done')
                toast.show(params)
                resolve()
            })
        }
        Vue.prototype.$toast = $toast
    }
}