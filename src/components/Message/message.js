/* eslint-disable no-use-before-define */
import Vue from 'vue';
import TMessage from './message.vue';

let instances = [];
function Message(data) {
  data = data || {};
  if (typeof data === 'string') {
    data = {
      message: data
    }
  }
  data.onClose = function () {
    console.log('onClose');
    // instance是消息弹框组件的实例对象即VueComponent
    Message.close(instance);
  };

  const MessageClass = Vue.extend(TMessage);

  let instance = new MessageClass({ data });
  instance.$mount();
  // console.log(instance.$el,'现在才可以访问$el');
  document.body.appendChild(instance.$el);

  let offset = data.offset || 20;

  // 规定每一个消息弹框的间隔
  let offsetTop = offset;
  // 第一个弹框是不需要计算偏移量的
  // 从第一个以后再去循环
  instances.forEach(item => {
    // 上一个实例对象的offsetTop+自身的高度+规定的间隔
    offsetTop += item.$el.offsetHeight + offset;
  });
  instance.$el.style.top = offsetTop + 'px';
  instances.push(instance);
}

Message.close = function (instance) {
  let removeHeight = instance.$el.offsetHeight + instance.offset;
  let index = instances.findIndex(item => item === instance);
  instances = instances.filter(item => item !== instance);

  for (let i = index; i < instances.length; i++) {
    instances[i].$el.style.top = parseFloat(instances[i].$el.style.top) - removeHeight + 'px';
  }
};

['info', 'success', 'error', 'warning'].forEach(type => {
  Message[type] = function (data) {
    if (typeof data === 'string') {
      data = {
        message: data
      }
    }
    data.type = type;
    // 整合data后再次去调用Message()
    return Message(data);
  };
});

export default Message
