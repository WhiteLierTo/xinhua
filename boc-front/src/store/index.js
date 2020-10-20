import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    charts: [],
    pollingFunctions: [],
    name: '吴中区',//地图传递区名
    bankDetail: {},
    itemList: [],//分行标签
    bankName: '',//分行名称
    valList: []//雷达数据
  },
  mutations: {
    updateValList(state, valList) {
      state.valList = valList
    },
    updateBankName(state, bankName) {
      state.bankName = bankName
    },
    updateItemList(state, itemList) {
      state.itemList = itemList
    },
    updatebank(state, bankDetail) {
      state.bankDetail = bankDetail
    },
    updateName(state, name) {
      state.name = name
    },
    addCharts(state, chart) {
      state.charts.push(chart)
    },

    chartsResize(state) {
      state.charts.forEach(c => c.resize())
    },

    addPolling(state, func) {
      this.state.pollingFunctions.push(func);
    }
  },
  actions: {},
  modules: {}
})
