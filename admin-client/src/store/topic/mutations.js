import { Message } from 'element-ui'

export default {
  FAIL (state, data) {
    Message.error(data)
  },
  GET_TOPICS_SUCCESS (state, data) {
    state.list = data.data
  }
}
