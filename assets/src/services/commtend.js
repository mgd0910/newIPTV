
// import * as http from './http'
import * as api from './api'
import config from '../utils/config'
let urlPre = config.apiHost + '/tv'
if (process.env.NODE_ENV == 'development') {
  urlPre = config.apiHost + '/tv'
} else if (process.env.NODE_ENV == 'debug') {
  urlPre = config.apiHost + '/tv'
} else if (process.env.NODE_ENV == 'production') {
  urlPre = 'http://' + window.location.hostname + ":5000" + '/tv'
}

class AdminService {
  //导航列表接口
  getNav(params) {
    let newUrl = urlPre + '/nav/v1'
    return api.get(newUrl, params).then(ret => {
      return ret
    })
  }
  //首页信息列表
  homepage(params) {
    let newUrl = urlPre + '/index/v1'
    return api.get(newUrl, params).then(ret => {
      return ret.data
    })
  }
  //栏目课程列表
  categoryCourseList(params) {
    let newUrl = urlPre + '/categorycourse/v1'
    return api.get(newUrl, params).then(ret => {
      return ret.data
    })
  }
  //栏目列表
  categoryList(params) {
    let newUrl = urlPre + '/categorylist/v1'
    return api.get(newUrl, params).then(ret => {
      return ret.data
    })
  }
  //课程信息
  courseInfo(params) {
    let newUrl = urlPre + '/courseinfo/v1'
    return api.get(newUrl, params).then(ret => {
      return ret.data
    })
  }
  //栏目全部课程
  categoryallcourseList(params) {
    let newUrl = urlPre + '/categoryallcourse/v1'
    return api.get(newUrl, params).then(ret => {
      return ret.data
    })
  }
  courseList(params) {
    let newUrl = urlPre + '/courselist/v1'
    return api.get(newUrl, params).then(ret => {
      return ret.data
    })
  }
  //收藏列表
  collectList(params) {
    let newUrl = urlPre + '/coursefavoritelist/v1'
    return api.get(newUrl, params).then(ret => {
      return ret.data
    })
  }

  //免费列表
  // freeList(params) {
  //   let newUrl = urlPre + '/coursefavoritelist/v1'
  //   return api.get(newUrl, params).then(ret => {
  //     return ret.data
  //   })
  // }

  //收藏课程
  collectCourse(params) {
    let newUrl = urlPre + '/coursefavorite/v1'
    return api.get(newUrl, params).then(ret => {
      return ret.data
    })
  }

  //历史列表
  historyList(params) {
    let newUrl = urlPre + '/coursehistorylist/v1'
    return api.get(newUrl, params).then(ret => {
      return ret.data
    })
  }

  //观看历史
  coursehistory(params){
    let newUrl = urlPre + '/coursehistory/v1'
    return api.get(newUrl, params).then(ret => {
      return ret.data
    })
  }


  //专题接口
  subjectList(params) {
    let newUrl = urlPre + '/specialindex/v1'
    // console.log(newUrl);//http://124.116.129.187:5000/tv/specialindex/v1
    return api.get(newUrl, params).then(ret => {
      return ret.data
    })
  }




  // //购买地址
  // buydata() {
  //   let newUrl = 'http://www.tysx.com?rspCode=0&rspDesc='
  //   return api.get(newUrl).then(ret => {
  //     return ret
  //   })
  // }
  



  // getHuaweiVideo() {
  //   let url="http://113.136.42.38:8282"
  //   //let newUrl = url + "/EPG/jsp/zyfz/en/smallplay/smallplay.jsp?CODE=d5c34a0e8f964e9b9836ee525b5f2dbe&PARENTCODE=d5c34a0e8f964e9b9836ee525b5f2dbe&ISLOOP=0&WIDTH=554&HEIGHT=157&LEFT=23&TOP=41"
  //   let newUrl = "http://www.baidu.com/"
  //   console.log(newUrl)
  //   return api.get(newUrl).then(ret => {
  //     return ret
  //   })
  // }

  //测试订购记录
  setBuy(params){
    let newUrl = urlPre + '/order_data_receipt/v1'
    // console.log(newUrl);//http://124.116.129.187:5000/tv/specialindex/v1
    return api.get(newUrl, params).then(ret => {
      return ret.data
    })
  }

}
export default new AdminService()