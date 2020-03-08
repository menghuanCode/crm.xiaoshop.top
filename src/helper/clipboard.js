import Clipboard from 'clipboard'
import { Message } from 'element-ui'

function clipboardSuccess() {
  return Message({
    type: 'success',
    message: '复制成功'
  })
}
function clipboardError() {
  Message({
    type: 'error',
    message: '复制失败'
  })
}

function _clipboard(text, event) {
  const clipboard = new Clipboard(event.currentTarget || event.target, {
    text: () => text
  })

  clipboard.on('success', ({ text }) => {
    clipboardSuccess(text)
    clipboard.destroy()
  })

  clipboard.on('error', function () {
    clipboardError()
    clipboard.destroy()
  })

  clipboard.onClick(event)
}

export default _clipboard