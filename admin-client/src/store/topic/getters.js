import moment from 'moment'

export default {
  list (state) {
    return state.list.map(item => ({
      ...item,
      time: moment(item.created).format('YYYY-MM-DD HH:mm:ss')
    }))
  }
}
