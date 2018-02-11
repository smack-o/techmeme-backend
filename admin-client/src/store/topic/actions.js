import {
  getTopics
} from '@/services/topic'

export default {
  getTopics ({ commit, state }, data) {
    return getTopics(data).then(result => {
      if (result.success) {
        commit('GET_TOPICS_SUCCESS', result.data)
      } else {
        commit('FAIL', result.message)
      }
    })
  }
}
