<!-- 首页 -->
<template>
    <div class="home">
        <Head></Head>
        <!-- <Nav :data="navList"></Nav> -->
        <Nav></Nav>
        <div class="body">
            <div class="columnBox">
                <div class="column" 
                    v-for="(v,i) in columnList" 
                    :key="i"
                    v-items
                    @up="columnup(i)"
                    @down="columndown(i)"
                    @left="columnleft(i)"
                    @right="columnright(i)"
                    @click="columnClk(i,v)"
                >
                    <img :src="v.image" alt="">
                </div>
            </div>
            <div class="videoBox">
                <div class="video"
                    id="videoId" 
                    v-items
                    @up="videoup()"
                    @down="videodown()"
                    @left="videoleft()"
                    @right="videoright()"
                    @click="videoClk()"
                >
                    <!-- <video src="../../static/video/video.mp4" controls="controls" autoplay="autoplay"></video> -->
                    <iframe v-if="SmallVideoUrl!=''" id="iframeId" src="../../static/video/video.mp4"></iframe>
                    <img v-else :src="video.image" alt="">
                    <!-- <iframe id="iframeId" :src="SmallVideoUrl"></iframe> -->
                    
                </div>
            </div>
            <div class="projectBox">
                <div class="project"
                    v-for="(v,i) in projectList"
                    :key="i"
                    v-items
                    @up="projectup(i)"
                    @down="projectdown(i)"
                    @left="projectleft(i)"
                    @right="projectright(i)"
                    @click="projectClk(i,v)"
                >
                    <img :src="v.image" alt="">
                </div>
            </div>
            <div class="lastBox">
                <div class="last"
                    v-for="(v,i) in recommeList"
                    :key="i"
                    v-items
                    @up="lastup(i)"
                    @down="lastdown(i)"
                    @left="lastleft(i)"
                    @right="lastright(i)"
                    @click="lastClk(i,v)"
                >
                    <img :src="v.image" alt="">
                </div>
            </div>
        </div>
        <Foot 
            v-if="flag"
            :footList="footList"
            :footup="footup"
            :footdown="footdown"
            :footleft="footleft"
            :footright="footright"
        >
        </Foot>
        <div class="bodyBox"></div>
    </div>
</template>

<script>
import storage from '../utils/localStorage'
import cut from '../utils/cut.js'
import server from "../services/server.js"
import serviceBack from "../utils/serviceBack.js"
export default {
    name:"home",
    components:{
        Head:resolve => {require(['./component/Head.vue'],resolve)},
        Nav:resolve => {require(['./component/Nav.vue'],resolve)},
        Foot:resolve => {require(['./component/Foot.vue'],resolve)},
    },
    data () {
        return {
            columnList:[],
            video:{},
            recommeList:[],
            projectList:[],
            footList:{},
            flag:false,
            winurl:"",//获取到的地址
            backurls:'',
            backurl:'',//返回地址

            // 小窗播放需要的参数
            info:{},
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
            ISLOOP:void 0, //是否循环播放 1表示循环，0表示不循环
            href:'',//获取地址
            VideoUrl:'',//最后请求的播放地址
            SmallVideoUrl:'',//小窗播放的地址
            course_id:'',//视频参数id
            course_type:'',//视频参数type
            

        }
    },

    computed: {},
    created() {
        this.getData();
        this.getBasic()
    },

    mounted(){
        setTimeout(() => {
            this.catach();
        }, 100);
    },
    methods: {
        getData(){
            let data=["index-head-left","index-head-right","index-move","index-lower-list","index-section-special"];
            server.geData(data).then(ret=>{
                this.footList = ret['index-section-special']
                let footList = Object.keys(this.footList);
                if(footList.length>0){
                    this.flag=true
                }
                this.columnList=ret['index-head-left'].content
                this.projectList = ret['index-head-right'].content
                this.recommeList = ret['index-lower-list'].content
                this.video = ret["index-move"].content[0]   //请求播放接口拿到视频然后再显示在播放小窗口
            }).then(()=>{
                console.log(this.video);
                let params={
                    id:this.video.id,
                    type:this.video.type
                }
                server.getCourse(params).then(ret=>{
                    console.log(ret.data);
                    this.info={
                        id:ret.data.course.id,
                        type:"course"
                    }
                    this.code=ret.data.course.video_code
                    this.auto();
                })
            })
        },
        getFirstFocus(){
            let downCurrent = storage.get("downCurrent");
            if(downCurrent){
                let column = document.getElementsByClassName(downCurrent.class)[downCurrent.index];
                this.$service.move(column);
            }else{
                let el = document.getElementsByClassName("navBoxListTit")[0];
                this.$service.move(el);
            }
        },
        catach(){

            // 让对应的导航字变黄，好区分
            let navDoms = document.getElementsByClassName("navBoxListTit")
            for(let i=0;i<navDoms.length;i++){
                navDoms[i].style.color="#fff"
            }
            console.log(navDoms[0]);
            navDoms[0].style.color="#ffd131"

            let downCurrent = storage.get("downCurrent");
            if(downCurrent){
                switch(downCurrent.class){
                    case "column":
                        let column = document.getElementsByClassName("column")[downCurrent.index];
                        this.$service.move(column);
                    break;
                    case "video":
                        let video = document.getElementsByClassName("video")[downCurrent.index];
                        this.$service.move(video);
                    break;
                    case "project":
                        let project = document.getElementsByClassName("project")[downCurrent.index];
                        this.$service.move(project);
                    break;
                    case "last":
                        let last = document.getElementsByClassName("last")[downCurrent.index];
                        this.$service.move(last);
                    break;
                     case "footBody":
                        let footBody = document.getElementsByClassName("footBody")[downCurrent.index];
                        console.log(footBody);
                        this.$service.move(footBody);
                        let top= 20
                        document.querySelector(".home").style.top="-"+top+"rem"
                    break;
                }
                storage.del("downCurrent");
            }
        },
        getBasic(){
            this.winurl = decodeURI(window.location.href);
            this.backurls = cut.getParams(this.winurl)
            let url = cut.getParams(this.backurls)
            console.log(url);
            storage.set("backurl",url)
            storage.get("backurl").indexOf("vas_to_epg")
            // console.log(storage.get("backurl").indexOf("vas_to_epg"));
            // console.log(storage.get("backurl").indexOf("backurl"));
            if(url.indexOf("HUAWEI")>-1){
                storage.set("parnter","huawei")
            }else if(url.indexOf("ZTE")>-1){
                storage.set("parnter","zte")
            }else{
                storage.set("parnter","huawei")
            }
        },
        columnup(i){
            if(i==0){
                let el = document.getElementsByClassName("navBoxListTit")[0];
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("column")[i-1];
                this.$service.move(el);
            }
        },
        columndown(i){
            if(i==2){
                let el = document.getElementsByClassName("last")[0]
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("column")[i+1];
                this.$service.move(el);
            }
        },
        columnleft(i){
            return;
        },
        columnright(i){
            let el = document.getElementsByClassName("video")[0];
            this.$service.move(el);
        },
        columnClk(i,v){
            console.log(i,v);
            storage.set("downCurrent",{
                index: i,
                class: "column"
            })
            storage.set("historyPath",{
                path:this.$route.path
            })
            this.$router.push({
                path: "/play",
                query: { id: v.id,type:v.type}
            });   
        },

        videoup(i){
            let el = document.getElementsByClassName("navBoxListTit")[0];
            this.$service.move(el);
        },
        videodown(i){
            let el = document.getElementsByClassName("last")[1];
            this.$service.move(el);
        },
        videoleft(i){
            let el = document.getElementsByClassName("column")[0];
            this.$service.move(el);
        },
        videoright(i){
            let el = document.getElementsByClassName("project")[0];
            this.$service.move(el);
        },
        videoClk(){
            // storage.set("downCurrent",{
            //     index: 0,
            //     class: "video"
            // })
            // storage.set("historyPath",{
            //     path:this.$route.path
            // })
            // this.$router.push({
            //     path: "/play",
            //     query: { id: this.video.id,type:this.video.type}
            // });   
            window.location.href=this.VideoUrl;
        },
        projectup(i){
            if(i==0){
                let el = document.getElementsByClassName("navBoxListTit")[0];
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("project")[i-1];
                this.$service.move(el);
            }
        },
        projectdown(i){
            if(i==1){
                let el = document.getElementsByClassName("last")[3];
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("project")[i+1];
                this.$service.move(el);
            }
        },
        projectleft(i){
            let el = document.getElementsByClassName("video")[0];
            this.$service.move(el);
        },
        projectright(i){
            return;
        },
        projectClk(i,v){
            storage.set("downCurrent",{
                index: i,
                class: "project"
            })
            storage.set("historyPath",{
                path:this.$route.path
            })
            this.$router.push({
                path: "/play",
                query: { id: v.id,type:v.type}
            });   
        },
        lastup(i){
            if(i==0){
                let el = document.getElementsByClassName("column")[2];
                this.$service.move(el);
            }
            if(i==1||i==2){
                let el = document.getElementsByClassName("video")[0];
                this.$service.move(el);
            }
            if(i==3){
                let el = document.getElementsByClassName("project")[1];
                this.$service.move(el);
            }
        },
        lastdown(i){
            if(i==0){
                let el = document.getElementsByClassName("footBody")[0];
                this.$service.move(el);
            }
            if(i==1||i==2){
                let el = document.getElementsByClassName("footBody")[1];
                this.$service.move(el);
            }
            if(i==3){
                let el = document.getElementsByClassName("footBody")[2];
                this.$service.move(el);
            }
            let top= 20
            document.querySelector(".home").style.top="-"+top+"rem"
        },
        lastleft(i){
            if(i==0){
                return;
            }else{
                let el = document.getElementsByClassName("last")[i-1];
                this.$service.move(el);
            }
        },
        lastright(i){
            if(i==3){
                return
            }else{
                let el = document.getElementsByClassName("last")[i+1];
                this.$service.move(el);
            }
        },
        lastClk(i,v){
            storage.set("downCurrent",{
                index: i,
                class: "last"
            })
            storage.set("historyPath",{
                path:this.$route.path
            })
            this.$router.push({
                path: "/play",
                query: { id: v.id,type:v.type}
            });   
        },
        footup(i){
            if(i==0){
                let el = document.getElementsByClassName("last")[0];
                this.$service.move(el);
            }
            if(i==1){
                let el = document.getElementsByClassName("last")[1];
                this.$service.move(el);
            }
            if(i==2){
                let el = document.getElementsByClassName("last")[3];
                this.$service.move(el);
            }
            document.querySelector(".home").style.top=0+"px"
        },
        footdown(i){
            return;
        },
        footleft(i){
            if(i==0){
                return
            }else{
                let el = document.getElementsByClassName("footBody")[i-1];
                this.$service.move(el);
            }   
        },
        footright(i){
            if(i==2){
                return
            }else{
                let el = document.getElementsByClassName("footBody")[i+1];
                this.$service.move(el);
            }
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
            this.ISLOOP = 1;
            let WIDTH = document.getElementById("videoId").offsetWidth;
            let HEIGHT = document.getElementById("videoId").offsetHeight;
            let LEFT = document.getElementById("videoId").offsetLeft;
            let TOP = document.getElementById("videoId").offsetTop;
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
                this.SmallVideoUrl = `${newUrl}/EPG/jsp/zyfz/en/smallplay/smallplay.jsp?CODE=${this.code}&PARENTCODE=${this.PARENTCODE}&ISLOOP=${this.ISLOOP}&WIDTH=${WIDTH}&HEIGHT=${HEIGHT}&LEFT=${LEFT}&TOP=${TOP}`;
            }else if(parnter=="zte"){
                this.VideoUrl=`${newUrl}/iptvepg/frame223/zteplay/play_auth.jsp?CODE=${this.code}&PARENTCODE=${this.PARENTCODE}&USERID=${this.userID}USERTOKEN=${this.userToken}&PLAYTYPE=${this.PLAYTYPE}&SPID=${this.SPID}&BACKURL=${this.BACKURL}`
                this.SmallVideoUrl = `${newUrl}/iptvepg/frame223/smallplay/smallplay.jsp?CODE=${this.code}&PARENTCODE=${this.PARENTCODE}&ISLOOP=${this.ISLOOP}&WIDTH=${WIDTH}&HEIGHT=${HEIGHT}&LEFT=${LEFT}&TOP=${TOP}`;
            }else{
                this.VideoUrl=`${newUrl}/EPG/jsp/zyfz/en/play/play_auth.jsp?CODE=${this.code}&PARENTCODE=${this.PARENTCODE}&USERID=${this.userID}USERTOKEN=${this.userToken}&PLAYTYPE=${this.PLAYTYPE}&SPID=${this.SPID}&BACKURL=${this.BACKURL}`
                this.SmallVideoUrl = `${newUrl}/EPG/jsp/zyfz/en/smallplay/smallplay.jsp?CODE=${this.code}&PARENTCODE=${this.PARENTCODE}&ISLOOP=${this.ISLOOP}&WIDTH=${WIDTH}&HEIGHT=${HEIGHT}&LEFT=${LEFT}&TOP=${TOP}`;
            }
            console.log(this.SmallVideoUrl);
            console.log(this.VideoUrl);
        },
        serviceBack(){
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
</script>
<style lang='less' scoped>
    .focus{
        box-shadow: 0px 0px 0.6rem 0.4rem #FFD131;
        -moz-transform:scale(1.1,1.1); 
        -webkit-transform:scale(1.1,1.1); 
        -o-transform:scale(1.1,1.1); 
        z-index: 999;
        position: relative;
    }
    .home{
        margin-top:2.5rem;
        margin-left:4rem;
        margin-right:4rem;
        color: #fff;
        position: relative;
        .body{
            width:87rem;
            height: 36.9rem;
            margin-top: 1.7rem;
            position: relative;
            margin-bottom: 3rem;
            .columnBox{
                width: 21rem;
                height: 24.2rem;
                float: left;
                .column{
                    width: 21rem;
                    height: 7.4rem;
                    margin-bottom: 1rem;
                    background-color: #fff;
                    img{
                        width: 21rem;
                        height: 7.4rem;
                    }
                }
                .column:last-child{
                    margin-bottom: 0rem;
                }
            }
            .videoBox{
                width: 43rem;
                height: 24.2rem;
                float: left;
                margin: 0rem 1rem 1rem 1rem;
                .video{
                    width: 43rem;
                    height: 24.2rem;
                    video{
                        width: 43rem;
                        height: 24.2rem;
                    }
                    img{
                        width: 43rem;
                        height: 24.2rem;
                    }
                    #iframeId{
                        width: 43rem;
                        height: 24.2rem;
                        video{
                            width: 43rem;
                            height: 24.2rem;
                            margin:0;
                        }
                    }
                }
            }
            .projectBox{
                width:21rem ;
                height: 36.9rem;
                float: left;
                .project{
                    width:21rem ;
                    height: 11.6rem;
                    background-color: #fff;
                    img{
                        width:21rem ;
                        height: 11.6rem;
                    }
                }
                .project:first-child{
                    margin-bottom: 1rem;
                }
            }
            .lastBox{
                width:87rem;
                height: 11.8rem;
                position: absolute;
                left: 0;
                bottom: 0;
                .last{
                    width: 21rem;
                    height: 11.8rem;
                    float: left;
                    background-color: #fff;
                    margin-right: 1rem;
                    img{
                        width: 21rem;
                        height: 11.8rem;
                    }
                }
                .last:last-child{
                    margin-right: 0rem;
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
