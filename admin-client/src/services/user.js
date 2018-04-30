import request from '../utils/request'

export const getUser = () => request({
  url: 'bg/user',
  method: 'get'
})

export const login = data => request({
  url: 'bg/login',
  method: 'post',
  data
})

export const logout = data => request({
  url: 'bg/logout',
  data
})
