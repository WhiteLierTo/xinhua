import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userDetail: {},  // 用户细节信息
    permissions: [], //权限们
  },
  mutations: {
    setUserDetail(state, detail) {
      state.userDetail = detail;
    },

    updateUserDetail(state, detail) {
      state.userDetail = Object.assign(state.userDetail, detail);
    },

    setPermissions(state, permissions) {
      state.permissions = [...permissions, 'allow'];
    }

  }
});
export default store
