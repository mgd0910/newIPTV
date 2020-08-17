import qs from 'qs'
import axios from 'axios'
import ajax from 'ajax'
// import authUtils from '../utils/authUtils'
// import store from '@/store/index';
//切换环境
// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = 'https://www.baidu.com'
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = 'https://www/ceshi.com'
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = 'https://www.production.com'
// }
//设置请求超时
//通过axios.defauits.timeout设置默认的请求超时时间，例如超过了10s，就会告知用户当前请求超时，请刷新等。


axios.defaults.timeout = 10000


//post请求头的设置
//post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置，即设置Post请求头为application/x-www-form-urlencoded;charset=UTF-8


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url,{
            params:params
        }).then(function (res) {
            resolve(res)
        }).catch(function (err) {
            reject(err)
        })
    })
}
export function post(url, params) {
    return new Promise((resolve, reject) => {
        let header={"Content-Type":"application/json"}
        let data=qs.stringify(params)
        axios.post(
            url,
            data,
            header
        ).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

export function instance(url, params) {
    return new Promise((resolve, reject)=>{
        let header={}
        header["Content-Type"] = 'application/json';
        axios.request({
            url: url,
            method:'post',
            data:params,
            headers: header
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
    
}


