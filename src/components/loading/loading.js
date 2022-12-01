import Loading from './loading.vue'

export default {
  install: function (Vue) {
    const LoadingConstructor = Vue.extend(Loading)
    const instance = new LoadingConstructor()

    document.body.appendChild(instance.$mount().$el)
    Vue.prototype.$loading={
        show:()=>{
            instance.show = true
        },
        hide:()=>{
            instance.show = false
        },
        isrun:()=> {
          return instance.show 
        }
    }
  }
}