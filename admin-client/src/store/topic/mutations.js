import { Message } from 'element-ui'

export default {
  FAIL (state, data) {
    Message.error(data)
  },
  GET_TOPICS_SUCCESS (state, data) {
    state.list = data.data
  },
  REMOVE_SUCCESS () {
    Message.success('删除成功')
  },
  UPDATE_SUCCESS () {
    Message.success('更新成功')
  }
}
