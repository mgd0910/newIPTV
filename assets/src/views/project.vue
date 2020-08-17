<!-- 专题模板 -->
<template>
    <div class="project" id="projectId">
        <div class="project1" v-if="projectList.path==1">
            <div class="projectBox">
               <LeftProject :fun="goPrev" :leftArrowRight="leftArrowRight"></LeftProject>
                <div class="container">
                    <div class="projects"
                        v-items
                        v-for="(v,i) in projectList.list"
                        :key="i"
                        @up="project1up(i)"
                        @down="project1down(i)"
                        @left="project1left(i)"
                        @right="project1right(i)"
                        @click="projectClk(i,v)"
                    >
                        <img src="" alt="">
                    </div>
                </div>
                <RightProject :fun="goNext" :rightArrowLeft="rightArrowLeft"></RightProject>
            </div>
        </div>
        <div class="project2" v-if="projectList.path==2">
            <div class="projectBox">
                <div class="projects"
                    v-items
                    v-for="(v,i) in projectList.list"
                    :key="i"
                    @up="project2up(i)"
                    @down="project2down(i)"
                    @left="project2left(i)"
                    @right="project2right(i)"
                    @click="projectClk(i,v)"
                >
                    <img src="" alt="">
                </div>
            </div>
        </div>
        <div class="project3" v-if="projectList.path==3">
            <div class="projectBox">
                <div class="projects"
                    v-items
                    v-for="(v,i) in projectList.list"
                    :key="i"
                    @up="project3up(i)"
                    @down="project3down(i)"
                    @left="project3left(i)"
                    @right="project3right(i)"
                    @click="projectClk(i,v)"
                >
                    <img src="" alt="">
                </div>
            </div>
        </div>
        <div class="project4" v-if="projectList.path==4">
            <div class="projectBox">
                <div class="projects"
                    v-items
                    v-for="(v,i) in projectList.list"
                    :key="i"
                    @up="project4up(i)"
                    @down="project4down(i)"
                    @left="project4left(i)"
                    @right="project4right(i)"
                    @click="projectClk(i,v)"
                >
                    <img src="" alt="">
                </div>
            </div>
        </div>
        <div class="project5">
            <div class="projectBox" v-if="list.length==4">
            <!-- <div class="projectBox" v-if="projectList.path==5"> -->
                <div class="projects"
                    v-items
                    v-for="(v,i) in list"
                    :key="i"
                    @up="project5up(i)"
                    @down="project5down(i)"
                    @left="project5left(i)"
                    @right="project5right(i)"
                    @click="projectClk(i,v)"
                >
                    <img src="" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import server from "../services/server.js"
import getUser from '../utils/getUser.js'
import storage from '../utils/localStorage'
import cut from '../utils/cut.js'

export default {
    data () {
        return {
            // bgImg:"../../../../static/images/erke.png",
            projectList:{
                path:5,
                bgImg:"../../../../static/images/erke.png",
            },
            list:[],
            userId:"",

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
        LeftProject:resolve => {require(['./component/LeftProject.vue'],resolve)},
        RightProject:resolve => {require(['./component/RightProject.vue'],resolve)},
    },

    computed: {},
    created () {
        this.getBasic()
        this.getData();
    },
    mounted(){
        document.getElementById("projectId").style.background=`url(${this.projectList.bgImg}) no-repeat`
        document.getElementById("projectId").style.backgroundSize="100% 100%"
        // let el = document.getElementsByClassName("projects")[0];
        // this.$service.move(el);
    },

    methods: {
        getData(){
            let route = this.$route.query.id;
            let params={
                id:route
            }
            this.getProject(params);
        },
        getProject(params){
            server.getProject(params).then(ret=>{
                console.log(ret.data);
                this.list=ret.data.content
            }).then(()=>{
                this.getFirstFouce()
            })
        },
        getFirstFouce(){
            let el = document.getElementsByClassName("projects")[0];
            this.$service.move(el);
        },
        // 模板一Start
        project1up(i){
            return;
        },
        project1down(i){
            return;
        },
        project1left(i){
            if(i==0){
                let el = document.getElementsByClassName("leftArrow")[0]
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("projects")[i-1];
                this.$service.move(el);
            }
        },
        project1right(i){
            if(i==4){
                let el = document.getElementsByClassName("rightArrow")[0]
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("projects")[i+1];
                this.$service.move(el);
            }
        },
        // 模板一End

        // 模板二Start
        project2up(i){
            if(i<=1){
                return;
            }else{
                let el = document.getElementsByClassName("projects")[i-2];
                this.$service.move(el);
            }
        },
        
        project2down(i){
            if(i>=4){
                return
            }else{
                let el = document.getElementsByClassName("projects")[i+2];
                this.$service.move(el);
            }
        },

        project2left(i){
            if(i%2==0){
                return;
            }else{
                let el = document.getElementsByClassName("projects")[i-1];
                this.$service.move(el);
            }
        },
        project2right(i){
            if(i%2!=0){
                return;
            }else{
                let el = document.getElementsByClassName("projects")[i+1];
                this.$service.move(el);
            }
        },
        // 模板二End


        // 模板三 Start
        project3up(i){
            if(i<=3){
                return;
            }else{
                let el = document.getElementsByClassName("projects")[i-4];
                this.$service.move(el);
            }
        },

        project3down(i){
            if(i<=3){
                let el = document.getElementsByClassName("projects")[i+4];
                this.$service.move(el);
            }else{
                return
            }
        },

        project3left(i){
            if(i%4==0){
                return;
            }else{
                let el = document.getElementsByClassName("projects")[i-1];
                this.$service.move(el);
            }
        },
        project3right(i){
            if(i%4==3){
                return;
            }else{
                let el = document.getElementsByClassName("projects")[i+1];
                this.$service.move(el);
            }
        },

        // 模板三End

        // 模板四Start
        project4up(i){
            if(i<=2){
                return
            }else{
                if(i==3){
                    let el = document.getElementsByClassName("projects")[0];
                    this.$service.move(el);
                }
                if(i==4||i==5){
                    let el = document.getElementsByClassName("projects")[1];
                    this.$service.move(el);
                }
                if(i==6){
                    let el = document.getElementsByClassName("projects")[2];
                    this.$service.move(el);
                }
            }
        },
        project4down(i){
            if(i>=3){
                return;
            }else{
                let el = document.getElementsByClassName("projects")[i+3];
                this.$service.move(el);
            }
        },

        project4left(i){
            if(i==0||i==3){
                return
            }else{
                let el = document.getElementsByClassName("projects")[i-1];
                this.$service.move(el);
            }
        },

        project4right(i){
            if(i==2||i==6){
                return;
            }else{
                let el = document.getElementsByClassName("projects")[i+1];
                this.$service.move(el);
            }
        },

        // 模板四End
        
        // 模板五Start
        project5up(i){
            return;
        },
        project5down(i){
            return;
        },

        project5left(i){
            if(i==0){
                return
            }else{
                let el = document.getElementsByClassName("projects")[i-1];
                this.$service.move(el);
            }
        },
        project5right(i){
            if(i==3){
                return
            }else{
                let el = document.getElementsByClassName("projects")[i+1];
                this.$service.move(el);
            }
        },

        // 模板五End

        goPrev(){
            console.log("object");
        },
        leftArrowRight(){  
            let el = document.getElementsByClassName("projects")[0];
            this.$service.move(el);
        },
        goNext(){
            console.log("object");
        },
        rightArrowLeft(){
            let el = document.getElementsByClassName("projects")[4];
            this.$service.move(el);
        },
        // 点击播放
        projectClk(i,v){
            this.userId = getUser.getuser();
            let params={
                id:v.id,
                type:v.type,
                tv_user_id:this.userId
            }
            console.log(params);
            server.getCourse(params).then(ret=>{
                console.log(ret.data.course.video_code);
                this.code = ret.data.course.video_code;
            }).then(()=>{
                this.auto()
            })
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
            this.course_id= this.$route.query.id;
            // this.course_type=this.info.type
            this.BACKURL = encodeURI("http://"+this.href+"/project?id="+this.course_id); //????
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
            window.location.href = this.VideoUrl
        },
        getBasic(){
            this.winurl = decodeURI(window.location.href);
            this.backurls = cut.getParams(this.winurl)
            let url = cut.getParams(this.backurls)
            storage.set("backurl",url)
            storage.get("backurl").indexOf("vas_to_epg")
            if(url.indexOf("HUAWEI")>-1){
                storage.set("parnter","huawei")
            }else if(url.indexOf("ZTE")>-1){
                storage.set("parnter","zte")
            }else{
                storage.set("parnter","huawei")
            }
        },
        serviceBack(){
            if (cut.GetQueryValue(this.backurls, "fromLaunch")) {
                Utility.setValueByName("exitIptvApp");
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

</script>
<style lang='less' scoped>
    .focus{
        box-shadow: 0px 0px 0.6rem 0.4rem #FFD131;
        -moz-transform:scale(1.1,1.1); 
        -webkit-transform:scale(1.1,1.1); 
        -o-transform:scale(1.1,1.1); 
    }
    .project{
        width: 100%;
        height: 100vh;
        .project1{
            width: 96rem;
            height: 100vh;
            position: relative;
            .projectBox{
                width: 87rem;
                height: 19rem;
                position: absolute;
                top:25.95rem;
                left:4.5rem;
                .container{
                    width: 81rem;
                    height: 19rem;
                    float: left;
                    .projects{
                        width: 14rem;
                        height: 19rem;
                        float: left;
                        background-color: #fff;
                        margin-right: 2.75rem;
                        img{
                            width: 14rem;
                            height: 19rem;
                        }
                    }   
                    .projects:last-child{
                        margin-right: 0rem;
                    }
                }
            }
        }
        .project2{
            width: 96rem;
            height: 100vh;
            position: relative;
            .projectBox{
                width: 41.75rem;
                height: 38.35rem;
                position: absolute;
                top: 10rem;
                left: 49.75rem;
                .projects{
                    width: 19.5rem;
                    height: 10.95rem;
                    float: left;
                    background-color: #fff;
                    margin-right: 2.75rem;
                    margin-bottom: 2.75rem;
                    img{
                        width: 19.5rem;
                        height: 10.95rem;
                    }
                }
                .projects:nth-child(2n+0){
                    margin-right: 0rem;
                }
                .projects:nth-last-child(1),.projects:nth-last-child(2){
                    margin-bottom: 0rem;
                }
            }
        }
        .project3{
            width: 96rem;
            height: 100vh;
            position: relative;
            .projectBox{
                width: 87rem;
                height:24.9rem;
                position: absolute;
                left: 4.5rem;
                top: 23.7rem;
                .projects{
                    width: 19.5rem;
                    height: 10.95rem;
                    float: left;
                    background-color: #fff;
                    margin-right: 3rem;
                    margin-bottom: 3rem;
                }
                .projects:nth-child(4n+0){
                    margin-right: 0rem;
                }
                .projects:nth-child(4+n){
                    margin-bottom: 0rem;
                }
            }
        }
        .project4{
            width: 96rem;
            height: 100vh;
            position: relative;
            .projectBox{
                width: 87rem;
                height:24.9rem;
                position: absolute;
                top: 23.7rem;
                left: 4.5rem;
                .projects{
                    width: 19.5rem;
                    height: 10.95rem;
                    float: left;
                    background-color: #fff;
                    margin-right: 3rem;
                    margin-bottom: 3rem;
                }
                .projects:nth-child(1){
                    margin-left: 11.25rem;
                }
                .projects:last-child{
                    margin-left: 3rem;
                    margin-right: 0rem;
                }
                .projects:nth-child(3n+0){
                    margin-right: 0rem;
                }
                .projects:nth-child(4+n){
                    margin-bottom: 0rem;
                }
            }       
        }
        .project5{
            width: 96rem;
            height: 100vh;
            position: relative;
            .projectBox{
                width: 62rem;
                height: 19rem;
                position: absolute;
                left: 4.5rem;
                top: 25.95rem;
                .projects{
                    width: 14rem;
                    height: 19rem;
                    float: left;
                    background-color: #fff;
                    margin-right: 2rem;
                }
                .projects:last-child{
                    margin-right: 0rem;
                }
            }
        }
    }
</style>