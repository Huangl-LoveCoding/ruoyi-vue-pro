import { listSimpleDictDatas } from '@/api/system/dict/data'

const state = {
  /**
   * 数据字典 MAP
   * key：数据字典大类枚举值 dictType
   * dictValue：数据字典小类数值 {dictValue: '', dictLabel: ''} 的数组
   */
  dictDatas: {}
}

const mutations = {
  SET_DICT_DATAS: (state, dictDatas) => {
    state.dictDatas = dictDatas
  }
}

const actions = {
  loadDictDatas({ commit }) {
    listSimpleDictDatas().then(response => {
      // 设置数据
      const dictDataMap = {}
      response.data.forEach(dictData => {
        // 获得 dictType 层级
        const enumValueObj = dictDataMap[dictData.dictType]
        if (!enumValueObj) {
          dictDataMap[dictData.dictType] = []
        }
        // 处理 dictValue 层级
        dictDataMap[dictData.dictType].push({
          dictValue: dictData.dictValue,
          dictLabel: dictData.dictLabel
        })
      })
      // 存储到 Store 中
      commit('SET_DICT_DATAS', dictDataMap)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
