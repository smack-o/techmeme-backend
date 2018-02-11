import {
  getTopics,
  removeTopic
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
  },
  removeTopic ({ commit, state }, data) {
    return removeTopic(data).then(result => {
      if (result.success) {
        commit('REMOVE_SUCCESS', result.message)
        return result
      } else {
        commit('FAIL', result.message)
      }
    })
  }
}
