import {
  getUser,
  login,
  logout
} from '@/services/user'

export default {
  getUser ({ commit, state }) {
    return getUser().then(result => {
      if (result.success) {
        commit('GET_USER_SUCCESS', result.data)
        return true
      }
      commit('FAIL', result.message)
      return false
    })
  },
  login ({ commit, state }, data) {
    return login(data).then(result => {
      if (result.success) {
        commit('LOGIN_SUCCESS')
        return true
      } else {
        commit('FAIL', result.message)
        return false
      }
    })
  },
  logout ({ commit, state }, data) {
    return logout(data)
  }
}
