import {
  getTopics,
  removeTopic,
  addTopic,
  updateTopic
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
  addTopic ({ commit, state }, data) {
    return addTopic(data).then(result => {
      if (result.success) {
        return result
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
  },
  updateTopic ({ commit, state }, data) {
    return updateTopic(data).then(result => {
      if (result.success) {
        commit('UPDATE_SUCCESS', result.message)
        return result
      } else {
        commit('FAIL', result.message)
      }
    })
  }
}
