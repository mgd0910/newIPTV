<!-- 视频播放 -->
<template>
    <div class="play">
        <!-- <Head></Head> -->
        <div class="body">
            <div class="bodyTop">
                <div class="video">
                    <img :src="image" alt="">
                </div>
                <div class="title">
                    <div class="titleTop">
                        {{titleTop}}
                    </div>
                    <div class="explain">
                        {{description}}
                    </div>
                    <div class="buttonBox">
                        <div class="playBtn" 
                            v-items
                            @up="playBtnup()"
                            @down="playBtndown()"
                            @left="playBtnleft()"
                            @right="playBtnright()"
                            @click="playBtnClk()"
                        >
                            <img src="../../static/icon/icon_play.png" alt="">
                            <div class="playBtnTitle">播放</div>
                        </div>
                        <div class="collectionBtn" 
                            v-items
                            @up="collectionBtnup()"
                            @down="collectionBtndown()"
                            @left="collectionBtnleft()"
                            @right="collectionBtnright()"
                            @click="collectionBtnClk()"
                            :style="{backgroundColor:bgColor}"
                        >
                            <img src="../../static/icon/icon_ favourite.png" alt="">
                            <div class="playBtnTitle">{{collectTitle}}</div>
                        </div>
                        <!-- <div class="collectionBtns" 
                            v-items
                            @up="collectionBtnup()"
                            @down="collectionBtndown()"
                            @left="collectionBtnleft()"
                            @right="collectionBtnright()"
                            @click="collectionBtnClk()"
                            v-else
                        >
                            <img src="../../static/icon/icon_ favourite.png" alt="">
                            <div class="playBtnTitle">取消收藏</div>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="relatedBox">
                <div class="relatedTit">
                    小儿推拿
                </div>
                <div class="relatedListBox">
                    <ul class="relatedList">
                        <li class="related"
                            v-for="(v,i) in relatedList"
                            :key="i"
                            v-items  
                            @up="relatedup(i)"
                            @down="relateddown(i)"  
                            @right="relatedright(i)"
                            @left="relatedleft(i)"
                            @click="relatedClk(i,v)"
                            @focus="relatedFocus(i,v)"
                            @blur="relatedBlur(i,v)"
                            
                        >
                            <span class="relatedTitle">{{v.title}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="recommendBox">
                <div class="recommendBoxTit">相关推荐</div>
                <div class="recommendList">
                    <div class="recommend"
                        v-for="(v,i) in recommendList"
                        :key="i"
                        v-items
                        @up="recommendup(i)"
                        @down="recommenddown(i)"  
                        @right="recommendright(i)"
                        @left="recommendleft(i)"
                        @click="recommendClk(i,v)"
                        @focus="recomHorse(i,v)"
                        @blur="recomBlur(i,v)"
                    >
                        <div class="imgBox">
                            <img :src="v.image" alt="">
                        </div>
                        <div class="titBox">
                            <div class="titBoxTitle">&nbsp;&nbsp;&nbsp;&nbsp;{{v.title}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bodyBox"></div>
    </div>
</template>

<script>
import storage from '../utils/localStorage'
import server from "../services/server.js"
import focus from '../utils/focus'
import  getUser from '../utils/getUser.js'
import cut from '../utils/cut.js'

export default {
data () {
    return {
        width:0,
        titleTop:'',//视频标题
        description:'',//视频解释
        image:"",//视频图片
        relatedList:[],//视频列表
        tags:'',//相关推荐需要传的参数
        recommendList:[], //相关推荐列表,
        info:{},
        is_favorite:void 0,
        bgColor:"",
        collectTitle:"",
        operation:void 0,

        userId:"",//用户id
        url:"",//动态地址
        userToken:'',//用户token
        userID:"",//用户id
        code:"",//视频code码
        PARENTCODE:'',//联播剧集，传code  
        PLAYTYPE:void 0, //播放类型  2单集 1剧集
        ISAUTHORIZATION:void 0, //是否需要鉴权 0：否  1: 是    
        BACKURL:"", //待返回的url，utf-8 encode编码
        SPID:'', //接入方
        // ISLOOP:void 0, //
        href:'',//获取地址
        VideoUrl:'',//最后请求的播放地址
        course_id:'',//视频参数id
        course_type:'',//视频参数type
        
    };
},

components: {
    Head:resolve => {require(['./component/Head.vue'],resolve)},
},
created () {
    this.getUserId()
    this.getData()
},
computed: {},

mounted(){
    this.getFirstFocus()
    
},

    methods: {
        getData(){
            let params=this.$route.query;
            params.tv_user_id=this.userId
            
            server.getCourse(params).then(ret=>{
                this.titleTop = ret.data.course.course_name
                this.description = ret.data.course.description
                this.image = ret.data.course.image
                this.relatedList = ret.data.list
                this.tags = ret.data.course.tags
                this.code = ret.data.course.video_code
                this.info={
                    id:ret.data.course.id,
                    type:"course"
                }
                this.is_favorite = ret.data.course.is_favorite
                if(this.is_favorite==0){
                    this.collectTitle = "收藏";
                    this.bgColor="#5186e0 !important";
                }else{
                    this.collectTitle = "取消"
                    this.bgColor="#FF634B !important";
                }
                
                this.auto()
            }).then(()=>{
                let tagParams={
                    page:1,
                    page_size:5,
                    tags:this.tags
                }
                server.getSearchToLabel(tagParams).then(ret=>{
                    this.recommendList = ret.data.list;
                })
            })
            
        },
        // 获取id
        getUserId(){
            this.userId = getUser.getuser()
        },
        // 页面进入焦点
        getFirstFocus(){
            let el = document.getElementsByClassName("playBtn")[0];
            this.$service.move(el);
        },
        
        auto(){
            this.href=window.location.hostname
            if (process.env.NODE_ENV == "production") {
                this.url = Authentication.CTCGetConfig("EPGDomain");
                this.userToken = Authentication.CTCGetConfig("UserToken");
                this.userID = Authentication.CTCGetConfig("UserID");
            } else {
                this.url = "http://11.11.11.11:8080/123sadfasdf.adf";
                this.userToken = "UserToken";
                this.userID = "123";
            }
            this.code = this.code;
            this.PARENTCODE = this.code;
            this.PLAYTYPE = 2;
            this.ISAUTHORIZATION = 0;
            this.course_id= this.info.id
            this.course_type=this.info.type
            this.BACKURL = encodeURI("http://"+this.href+"/play?id="+this.course_id+"&"+"type="+this.course_type); //????
            this.SPID = "XMHD";
            // this.ISLOOP = 0;
            let newUrl = this.url.match(
                /http.*:\/\/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}:\d{1,1000000}/
            );
            if (newUrl.length > 0) {
                newUrl = newUrl[0];
            } else {
                return;
            }
            let parnter = storage.get("parnter");
            if(parnter=="huawei"){
                this.VideoUrl=`${newUrl}/EPG/jsp/zyfz/en/play/play_auth.jsp?CODE=${this.code}&PARENTCODE=${this.PARENTCODE}&USERID=${this.userID}USERTOKEN=${this.userToken}&PLAYTYPE=${this.PLAYTYPE}&SPID=${this.SPID}&BACKURL=${this.BACKURL}`
            }else if(parnter=="zte"){
                this.VideoUrl=`${newUrl}/iptvepg/frame223/zteplay/play_auth.jsp?CODE=${this.code}&PARENTCODE=${this.PARENTCODE}&USERID=${this.userID}USERTOKEN=${this.userToken}&PLAYTYPE=${this.PLAYTYPE}&SPID=${this.SPID}&BACKURL=${this.BACKURL}`
            }else{
                this.VideoUrl=`${newUrl}/EPG/jsp/zyfz/en/play/play_auth.jsp?CODE=${this.code}&PARENTCODE=${this.PARENTCODE}&USERID=${this.userID}USERTOKEN=${this.userToken}&PLAYTYPE=${this.PLAYTYPE}&SPID=${this.SPID}&BACKURL=${this.BACKURL}`
            }
            console.log(this.VideoUrl);
        },
        playBtnup(){
            let el = document.getElementsByClassName("watch")[0];
            this.$service.move(el);
        },
        playBtndown(){
            // 先判断有无i，youi跳i，无i去0
            let relatedItem = storage.get("relatedItem");
            if(relatedItem){
                let el = document.getElementsByClassName("related")[relatedItem];
                this.$service.move(el);
                storage.del("relatedItem")
            }else{
                let el = document.getElementsByClassName("related")[0];
                this.$service.move(el);
            }
        },
        playBtnleft(){
            return;
        },
        playBtnright(){
            let el = document.getElementsByClassName("collectionBtn")[0];
            this.$service.move(el);
        },
        playBtnClk(){
            console.log("播放");
            window.location.href=this.VideoUrl
        },
        collectionBtnup(){
            let el = document.getElementsByClassName("watch")[0];
            this.$service.move(el);
        },
        collectionBtndown(){
            let relatedItem = storage.get("relatedItem");
            if(relatedItem){
                let el = document.getElementsByClassName("related")[relatedItem];
                this.$service.move(el);
                storage.del("relatedItem")
            }else{
                let el = document.getElementsByClassName("related")[0];
                this.$service.move(el);
            }
        },
        collectionBtnleft(){
            let el = document.getElementsByClassName("playBtn")[0];
            this.$service.move(el);
        },
        collectionBtnright(){
            return;
        },
        collectionBtnClk(){
            if(this.is_favorite==0){
                this.operation = 1
                // this.collectTitle = '取消'
                // this.bgColor="#FF634B !important";
                
            }else{
                this.operation = 0
                // this.collectTitle = '收藏'
                // this.bgColor="#5186e0 !important";
            }
            let params={
                operation:this.operation,
                tv_user_id:this.userId,
                course_id:this.course_id
            }
            console.log(params);
            server.getCollect(params).then((ret)=>{
                console.log(0);
                if(ret.code==0&&params.operation==1){
                    this.$toast({
                        content: "收藏成功",
                        type: "success",
                    });
                    this.collectTitle = '取消'
                    this.bgColor="#FF634B !important";
                    this.is_favorite=1
                }
                if(ret.code==0&&params.operation==0){
                    this.$toast({
                        content: "取消成功",
                        type: "success",
                    });
                    this.collectTitle = '收藏'
                    this.bgColor="#5186e0 !important";
                    this.is_favorite=0
                }
                // if(this.is_favorite==0){
                //     this.collectTitle = '收藏'
                //     this.bgColor="#5186e0 !important";
                // }else{  
                //     this.collectTitle = '取消'
                //     this.bgColor="#FF634B !important";
                // }
            })
        },
        relatedup(i){
            storage.set("relatedItem",i);
            // 先存一个i，载播放键下来的时候判断有没有i，有就跳到i上
            let el = document.getElementsByClassName("playBtn")[0];
            this.$service.move(el);
        },
        relateddown(i){
            storage.set("relatedItemDown",i);
            let top= document.querySelector(".bodyBox").getBoundingClientRect().top/4
            console.log(top);
            document.querySelector(".play").style.top="-"+top+"px"
            let el = document.getElementsByClassName("recommend")[0];
            this.$service.move(el);
        },
        relatedright(i){
            if(i>=2&&i<this.relatedList.length-2){
                let ul = document.getElementsByClassName("relatedList")[0];
                this.width+=21.55;
                console.log(this.width);
                ul.style.left="-"+this.width+"rem";
            }
            let el = document.getElementsByClassName('related')[i+1]
            this.$service.move(el);
        },
        relatedleft(i){
            if(i>=2&&i<this.relatedList.length-2){
                let ul = document.getElementsByClassName("relatedList")[0];
                this.width=this.width-21.55;
                ul.style.left="-"+this.width+"rem";
            }
            let el = document.getElementsByClassName('related')[i-1]
            this.$service.move(el);
        },
        relatedClk(i,v){
            // let params={
            //     id:v.id,
            //     type:v.type
            // };
            // console.log(params);
            // server.getCourse(params).then(ret=>{
            //     this.info={
            //         id:ret.data.course.id,
            //         type:"course"
            //     }
            //     this.code=ret.data.course.video_code
            //     this.auto()
            // })
            this.$router.push({
                path: "/play",
                query: { id: v.id,type:v.type}
            });
        },
        recommendup(i){
            let relatedItemDown = storage.get("relatedItemDown");
            if(relatedItemDown){
                let el = document.getElementsByClassName("related")[relatedItemDown];
                this.$service.move(el);
                storage.del("relatedItemDown")
            }else{
                let el = document.getElementsByClassName("related")[0];
                this.$service.move(el);
            }
            document.querySelector(".play").style.top=0+"px";
        },
        recommenddown(i){
            return;
        },
        recommendright(i){
            if(i==4){
                return;
            }else{
                let el = document.getElementsByClassName("recommend")[i+1];
                this.$service.move(el);
            }
        },
        recommendleft(i){
            if(i==0){
                return;
            }else{
                let el = document.getElementsByClassName("recommend")[i-1];
                this.$service.move(el);
            }
        },
        recommendClk(i,v){
            console.log(v);
            // let params={
            //     id:v.id,
            //     type:v.type
            // };
            // server.getCourse(params).then(ret=>{
            //     this.info={
            //         id:ret.data.course.id,
            //         type:"course"
            //     }
            //     this.code=ret.data.course.video_code
            //     this.auto()
            // })
            this.$router.push({
                path: "/play",
                query: { id: v.id,type:v.type}
            });
        },
        relatedFocus(i,v){
            focus.relatedHorse(i,v)
        },
        relatedBlur(i,v){
            focus.relatedBlur(i,v)
        },
        recomHorse(i,v){
            focus.recomHorse(i,v)
        },
        recomBlur(i,v){
            focus.recomBlur(i,v)
        },
        serviceBack(){
            let path = storage.get("historyPath");
            if(path){
                this.$router.push({
                    path: path.path
                });
                storage.del("historyPath");
            }else{
                // console.log("很复杂的逻辑");
                if (cut.GetQueryValue(this.backurls, "fromLaunch")) {
                    Utility.setValueByName("exitIptvApp");
                }else {
                    if(cut.GetQueryValue(this.backurls, "backUrl")){
                        this.backurl = cut.GetQueryValue(this.backurls, "backUrl")
                    }else if(cut.GetQueryValue(this.backurl, "backurl")){
                        this.backurl = cut.GetQueryValue(this.backurls, "backurl")
                    }else if(storage.get("backurl").indexOf("vas_to_epg") > -1){
                        let reg = /[^><]+(?=<\/page_url>)/gim;
                        let text = storage.get("backurl");
                        let str = text.replace(/%2F/g, "/");
                        let url = str.replace(/%3A/g, ":");
                        let urls = url.match(reg)[0];
                        this.backurl = urls + "?vas_info=%3Cvas_action%3Eback%3C/vas_action%3E";
                    }
                    window.location.href = this.backurl;
                }
            }
        }
    }
}

</script>
<style lang='less' scoped>
    .focus{
        box-shadow: 0px 0px 0.6rem 0.4rem #FFD131; 
        background-color: #FF7F25 !important;
    }
    .play{
        margin-top:2rem;
        margin-left:4rem;
        margin-right:4rem;
        color: #fff;
        position: relative;
        .body{
            margin-top: 1.95rem;
            width: 88rem;
            .bodyTop{
                width: 88rem;
                height: 20.25rem;
                margin-bottom: 3.05rem;
                .video{
                    width: 36rem;
                    height: 20.25rem;
                    float: left;
                    background-color: #fff;
                    img{
                        width: 36rem;
                        height: 20.25rem;
                    }
                }
                .title{
                    width: 49.5rem;
                    height: 20.25rem;
                    float: left;
                    margin-left: 2.5rem;
                    .titleTop{
                        width: 49.5rem;
                        height: 2.85rem;
                        line-height: 2.85rem;
                        font-size: 2.8rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                    .explain{
                        width: 49.5rem;
                        height: 6.3rem;
                        margin-top: 2.9rem;
                        margin-bottom: 2.15rem;
                        line-height: 2rem;
                        font-size: 1.2rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                    }
                    .buttonBox{
                        width: 49.5rem;
                        height: 6rem;
                        .playBtn{
                            width: 12rem;
                            height: 6rem;
                            background:#39C47A !important;
                            float: left;
                            margin-right: 1rem;
                            img{
                                width: 1.8rem;
                                height: 1.8rem;
                                float: left;
                                margin-top: 2.1rem;
                                margin-left: 2.75rem;
                            }
                            .playBtnTitle{
                                font-size: 1.8rem;
                                width: 3.6rem;
                                height: 6rem;
                                color: #fff;
                                float: left;
                                line-height: 5.7rem;
                                margin-left: 1.1rem;
                            }
                        }
                        .collectionBtn{
                            width: 12rem;
                            height: 6rem;
                            float: left;
                            img{
                                width: 1.8rem;
                                height: 1.8rem;
                                float: left;
                                margin-top: 2.1rem;
                                margin-left: 2.75rem;
                            }
                            .playBtnTitle{
                                font-size: 1.8rem;
                                width: 3.6rem;
                                height: 6rem;
                                color: #fff;
                                float: left;
                                line-height: 5.7rem;
                                margin-left: 1.1rem;
                            }
                        }
                    }
                }
            }
            .relatedBox{
                width: 88rem;
                height: 8.8rem;
                .relatedTit{
                    width: 88rem;
                    height: 2.25rem;
                    font-size: 2.2rem;
                    line-height: 2.25rem;
                    margin-bottom: 2.05rem;
                }
                .relatedListBox{
                    position: relative;
                    width: 91.5rem;
                    height: 6rem;
                    overflow: hidden;
                    
                    .relatedList{
                        position: absolute;
                        bottom:0.6rem;
                        left: 0;
                        padding-left: 0.6rem;
                        padding-right: 0.6rem;
                        height: 4.5rem;
                        list-style: none;
                        white-space: nowrap;
                        .related{
                            width: 19.5rem;
                            height: 4.5rem;
                            margin-right: 1rem;
                            display: inline-block;
                            font-size: 1.5rem;
                            line-height: 4.5rem;
                            background:rgba(116,113,160,1);
                            padding-left: 1.05rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            position: relative;
                            .relatedTitle{
                                margin-left: 1rem;
                                position: absolute;
                                top: 0;
                                left: 0;
                            }
                        }
                    }
                }
                
            }
            .recommendBox{
                width: 88rem;
                height: 9.3rem;
                margin-top: 5.05rem;
                margin-bottom: 5.5rem;
                .recommendBoxTit{
                    width: 88rem;
                    height:2.25rem;
                    margin-bottom: 0.9rem;
                    font-size: 2.2rem;
                    line-height: 2.25rem;
                }
                .recommendList{
                    width: 88rem;
                    height: 11.3rem;
                    .recommend{
                        width: 16.8rem;
                        height: 11.3rem;
                        margin-right: 1rem;
                        float: left;
                        .imgBox{
                            width: 16.8rem;
                            height:9.3rem;
                            background-color: #fff;
                            img{
                                width: 16.8rem;
                                height:9.3rem;
                            }
                        }
                        .titBox{
                            width: 16.8rem;
                            height: 2rem;
                            line-height: 2rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            background-color: #4A4974;
                            position: relative;
                            .titBoxTitle{
                                white-space:nowrap;/* 不换行 */
                                position: absolute;
                                top: 0;
                                left:0;
                            }
                        }
                    }
                    .recommend:last-child{
                        margin-right: 0rem;
                    }
                }
            }
        }
        .bodyBox{
            width: 1px;
            height: 1px;
            background-color: #fff;
        }
    }
</style>