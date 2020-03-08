import Msg from './src/main'

let component = null

const init = (instance) => {
  component = new instance();
  document.body.appendChild(component.$mount().$el);
}

Msg.install = function (Vue) {
  const instance = Vue.extend(Msg);
  Vue.prototype.$msg = function (title) {
    if (!component) {
      init(instance)
    }
    return component.showMsgBox(title).finally(() => { component = null; })
  }
}

export default Msg