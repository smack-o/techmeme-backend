import {
  getRestaurantList
} from '@/services/restaurant'

export default {
  getList ({ commit, state }, data) {
    return getRestaurantList(data).then(result => {
      if (result.success) {
        commit('GET_LIST_SUCCESS', result.data)
      } else {
        commit('FAIL', result.message)
      }
    })
  }
}
