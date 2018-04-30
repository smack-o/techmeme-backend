import { Message } from 'element-ui'

export default {
  FAIL (state, data) {
    state.isLoaded = true
    state.isLogin = false
    Message.error(data)
  },
  GET_USER_SUCCESS (state, data) {
    state.isLoaded = true
    state.isLogin = true
    state.username = data.data.name
  }
}
