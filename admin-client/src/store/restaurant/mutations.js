import { Message } from 'element-ui'

export default {
  FAIL (state, data) {
    Message.error(data)
  },
  GET_LIST_SUCCESS (state, data) {
    state.list = data.data
  },
  REMOVE_SUCCESS () {
    Message.success('删除成功')
  }
}
