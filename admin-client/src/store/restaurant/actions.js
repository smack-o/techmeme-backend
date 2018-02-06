import {
  getRestaurantList,
  addRestaurant,
  removeRestaurant
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
  },
  addRestaurant ({ commit, state }, data) {
    return addRestaurant(data).then(result => {
      if (result.success) {
        return result
      } else {
        commit('FAIL', result.message)
      }
    })
  },
  removeRestaurant ({ commit, state }, data) {
    return removeRestaurant(data).then(result => {
      if (result.success) {
        commit('REMOVE_SUCCESS', result.message)
        return result
      } else {
        commit('FAIL', result.message)
      }
    })
  }
}
