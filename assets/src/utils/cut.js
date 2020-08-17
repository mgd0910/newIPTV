let cut = {
    //获取播放页面返回索引
    GetQueryValue(ourl, name) {
        console.log(ourl, name);
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        console.log(reg);
        var r = ourl.substr(1).match(reg);
        if (r != null){
            return unescape(r[2]);
        }else{
            return null;
        } 
    },
    getParams(url) {
        var info = url.split("?");
        var newInfo = info[info.length - 1];
        return newInfo
    },
}

export default cut