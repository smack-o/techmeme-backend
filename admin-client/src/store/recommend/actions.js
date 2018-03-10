import {
  addRecommend,
  getRecommendList,
  removeRecommend,
  getRecommend,
  updateRecommend
} from '@/services/recommend'

export default {
  getList ({ commit, state }, data) {
    return getRecommendList(data).then(result => {
      if (result.success) {
        commit('GET_LIST_SUCCESS', result.data)
        return result.data
      } else {
        commit('FAIL', result.message)
      }
    })
  },
  addRecommend ({ commit, state }, data) {
    return addRecommend(data).then(result => {
      if (result.success) {
        return result
      } else {
        commit('FAIL', result.message)
      }
    })
  },
  removeRecommend ({ commit, state }, data) {
    return removeRecommend(data).then(result => {
      if (result.success) {
        return result
      } else {
        commit('FAIL', result.message)
      }
    })
  },
  getRecommend ({ commit, state }, data) {
    return getRecommend(data).then(result => {
      if (result.success) {
        return result.data.data
      } else {
        commit('FAIL', result.message)
      }
    })
  },
  updateRecommend ({ commit, state }, data) {
    return updateRecommend(data).then(result => {
      if (result.success) {
        commit('REMOVE_SUCCESS', result.message)
        return result
      } else {
        commit('FAIL', result.message)
      }
    })
  }
}
