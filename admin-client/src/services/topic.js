import request from '../utils/request'

export const getTopics = () => request({
  url: '/topic/list',
  method: 'get'
})

export const removeTopic = data => request({
  url: '/topic/:id',
  method: 'delete',
  data
})

export const addTopic = data => request({
  url: '/topic',
  method: 'post',
  data
})

export const updateTopic = data => request({
  url: '/topic/:id',
  method: 'put',
  data
})
