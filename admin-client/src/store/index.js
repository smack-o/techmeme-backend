/**
 * @file index.js
 * @author
 */
import Vue from 'vue'
import Vuex from 'vuex'
import restaurant from './restaurant'
import topic from './topic'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    restaurant,
    topic
  }
})
