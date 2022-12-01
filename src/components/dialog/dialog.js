import Vue from 'vue'
import Dialog from './dialog.vue'

let DialogConstrutor = Vue.extend(Dialog)
let instance

const dialogConversation = function(options = {}) {
    if(typeof options === 'string') {
        options = {
            content: options,
            onOk: () => {},
            onCancel: () => {}
        }
    }
    instance = new DialogConstrutor({
        data: options
    })
    document.body.appendChild(instance.$mount().$el)
}

export default dialogConversation
