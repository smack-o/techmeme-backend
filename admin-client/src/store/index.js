/**
 * @file index.js
 * @author
 */
import Vue from 'vue'
import Vuex from 'vuex'
import restaurant from './restaurant'
import topic from './topic'
import recommend from './recommend'
import user from './user'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    restaurant,
    topic,
    recommend,
    user
  }
})
