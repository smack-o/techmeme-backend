import {
  getRestaurantList
} from '@/services/restaurant'

export default {
  fetchAddress ({ commit, state }, data) {
    return getRestaurantList(data).then(result => {
      if (result.success) {
        commit('FETCH_ADDRESS_SUCCESS', result.data)
      } else {
        commit('FAIL', result.message)
      }
    })
  }
}
