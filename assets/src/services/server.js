
// import * as http from './http'
import * as api from './api'
import config from '../utils/config'

let urlPre = config.apiHost 
if (process.env.NODE_ENV == 'development') {
  urlPre = config.apiHost 
} else if (process.env.NODE_ENV == 'debug') {
  urlPre = config.apiHost 
} else if (process.env.NODE_ENV == 'production') {
  urlPre = 'http://' + window.location.hostname + ":5000" 
}
class AdminService {
    //导航列表接口
    getNav(params) {
      let newUrl = urlPre + '/title/1'
      return api.get(newUrl,params).then(ret => {
          return ret.data;
      })
    }
    // 区块数据获取
    geData(data){
      let newUrl = urlPre + '/section/content'
      // return api.post(newUrl,data).then(ret => {
      //     return ret.data;
      // })
      return api.instance(newUrl,data).then(ret => {
        return ret.data;
      })
    }

    // 最新课程列表
    getNewList(params){
      let newUrl = urlPre + '/course/newlist'
      return api.get(newUrl,params).then(ret => {
          return ret.data;
      })
    }
    
    //免费专区列表
    getFreeList(params){
      let newUrl = urlPre + '/course/freelist'
      return api.get(newUrl,params).then(ret => {
          return ret.data;
      })
    }

    // 获取课程信息
    getCourse(params){
      let newUrl = urlPre + '/course/get'
      return api.get(newUrl,params).then(ret => {
          return ret.data;
      })
    }

    // 搜索（按标签
    getSearchToLabel(params){
      let newUrl = urlPre + '/course/search_by_tag'
      return api.get(newUrl,params).then(ret => {
          return ret.data;
      })
    }

    //搜索课程（按拼音
    getPinyin(params){
      let newUrl = urlPre + '/course/search_by_pinyin'
      return api.get(newUrl,params).then(ret => {
          return ret.data;
      })
    }

    // 疾病页面基础接口
    getDisease(params){
      let newUrl = urlPre + '/category/disease_base'
      return api.get(newUrl,params).then(ret => {
          return ret.data;
      })
    }

    // 疾病内容栏目查询
    getDiseaseLabel(params){
      let newUrl = urlPre + '/category/disease_content_category'
      return api.get(newUrl,params).then(ret => {
          return ret.data;
      })
    }

    //热门推荐
    getHot(params){
      let newUrl = urlPre + '/course/search_by_hot'
      return api.get(newUrl,params).then(ret => {
          return ret.data;
      })
    }
    // 观看历史
    getHistory(params){
      let newUrl = urlPre + '/user/search_by_history'
      return api.get(newUrl,params).then(ret => {
          return ret.data;
      })
    }

    // 用户收藏列表
    getCollectList(params){
      let newUrl = urlPre + '/user/search_by_favorite'
      return api.get(newUrl,params).then(ret => {
          return ret.data;
      })
    }

    // 用户收藏
    getCollect(params){
      let newUrl = urlPre + '/user/favorite'
      return api.get(newUrl,params).then(ret => {
          return ret.data;
      })
    }

    // 获取专题
    getProject(params){
      let newUrl = urlPre + '/theme/get'
      return api.get(newUrl,params).then(ret => {
          return ret.data;
      })
    }
}
export default new AdminService()