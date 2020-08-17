<!-- 传统中医 -->
<template>
    <div class="parenting">
        <Head></Head>
        <Nav></Nav>
        <div class="body">
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
            <div class="moreBox">
                <div class="videoBox">
                    <div class="video"
                        v-items
                        v-for="(v,i) in videoList"
                        :key="i"
                        @up="videoup(i)"
                        @down="videodown(i)"
                        @left="videoleft(i)"
                        @right="videoright(i)"
                        @click="videoClk(i,v)"
                    >
                        <img :src="v.image" alt="">
                    </div>
                </div>
            </div>
            <div class="recommendBox">
                <div class="recommend"
                    v-for="(v,i) in recommendList"
                    :key="i"
                    v-items
                    @up="recommendup(i)"
                    @down="recommenddown(i)"
                    @left="recommendleft(i)"
                    @right="recommendright(i)"
                    @click="recommendClk(i,v)"
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
import storage from '../utils/localStorage';
import server from "../services/server.js"

export default {
    data () {
        return {
            projectList:[],
            videoList:[],
            recommendList:[],
            footList:{},
            flag:false
        };
    },

    components: {
        Head:resolve => {require(['./component/Head.vue'],resolve)},
        Nav:resolve => {require(['./component/Nav.vue'],resolve)},
        Foot:resolve => {require(['./component/Foot.vue'],resolve)},
    },

    computed: {

    },
    created () {
        this.getData();
    },

    mounted(){
        setTimeout(() => {
            this.catch();
        }, 100);
    },

    methods: {
        getData(){
            let data=["tcm-head-list","tcm-lower-list","tcm-column-list","tcm-special"];
            server.geData(data).then(ret=>{
                this.projectList=ret['tcm-head-list'].content;
                this.videoList=ret['tcm-lower-list'].content;
                this.recommendList=ret['tcm-column-list'].content;
                this.footList = ret['tcm-special']
                let footList = Object.keys(this.footList);
                if(footList.length>0){
                    this.flag=true
                }
            })
        },
        catch(){
            // 让对应的导航字变黄，好区分
            let navDoms = document.getElementsByClassName("navBoxListTit")
            for(let i=0;i<navDoms.length;i++){
                navDoms[i].style.color="#fff"
            }
            navDoms[4].style.color="#ffd131"

            let downCurrent = storage.get("downCurrent");
            if(downCurrent){
                console.log(downCurrent.class);
                switch(downCurrent.class){
                    case "project":
                        let project = document.getElementsByClassName("project")[downCurrent.index];
                        this.$service.move(project);
                    break;
                    case "video":
                        let video = document.getElementsByClassName("video")[downCurrent.index];
                        this.$service.move(video);
                    break;
                    case "column":
                        let column = document.getElementsByClassName("column")[downCurrent.index];
                        this.$service.move(column);
                    break;
                    case "recommend":
                        let recommend = document.getElementsByClassName("recommend")[downCurrent.index];
                        this.$service.move(recommend);
                        let top= 10;
                        document.querySelector(".parenting").style.top="-"+top+"rem"
                    break;
                    case "footBody":
                        let footBody = document.getElementsByClassName("footBody")[downCurrent.index];
                        this.$service.move(footBody);
                        let tops= 30;
                        document.querySelector(".parenting").style.top="-"+tops+"rem"
                    break;
                }
                storage.del("downCurrent");
            }
        },
        projectup(i){
            let el = document.getElementsByClassName("navBoxListTit")[4];
            this.$service.move(el);
        },
        projectdown(i){
            if(i==0){
                let el = document.getElementsByClassName("video")[0];
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("video")[2];
                this.$service.move(el);
            }
        },
        projectleft(i){
            if(i==0){
                return
            }else{
                let el = document.getElementsByClassName("project")[i-1];
                this.$service.move(el);
            }
        },
        projectright(i){
            if(i==1){
                return;
            }else{
                let el = document.getElementsByClassName("project")[i+1];
                this.$service.move(el);
            }
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
        videoup(i){
            if(i<=1){
                 let el = document.getElementsByClassName("project")[0];
                this.$service.move(el);
            }else{
                 let el = document.getElementsByClassName("project")[1];
                this.$service.move(el);
            }
        },
        videodown(i){
            let el = document.getElementsByClassName("recommend")[i];
            this.$service.move(el);
        },
        videoleft(i){
            if(i==0){
                return
            }else{
                let el = document.getElementsByClassName("video")[i-1];
                this.$service.move(el);
            }
        },
        videoright(i){
            if(i==3){
                return;
            }else{
                let el = document.getElementsByClassName("video")[i+1];
                this.$service.move(el);
            }
        },
        videoClk(i,v){
            storage.set("downCurrent",{
                index: i,
                class: "video"
            })
            storage.set("historyPath",{
                path:this.$route.path
            })
            this.$router.push({
                path: "/play",
                query: { id: v.id,type:v.type}
            });
        },
        recommendup(i){
            if(i<=1){
                let el = document.getElementsByClassName("video")[0];
                this.$service.move(el);
            }
            if(i==2){
                let el = document.getElementsByClassName("video")[1];
                this.$service.move(el);
            }
            if(i==3||i==4){
                let el = document.getElementsByClassName("video")[2];
                this.$service.move(el);
            }
            if(i==5){
                let el = document.getElementsByClassName("video")[3];
                this.$service.move(el);
            }
            let top= 0;
            document.querySelector(".parenting").style.top="-"+top+"rem"
        },
        recommenddown(i){
            if(i==0|i==1){
                let el = document.getElementsByClassName("footBody")[0];
                this.$service.move(el);
            }
            if(i==2|i==3){
                let el = document.getElementsByClassName("footBody")[1];
                this.$service.move(el);
            }
            if(i==4||i==5){
                let el = document.getElementsByClassName("footBody")[2];
                this.$service.move(el);
            }
            let top= 30;
            document.querySelector(".parenting").style.top="-"+top+"rem"
        },
        recommendleft(i){
            if(i==0){
                return;
            }else{
                let el = document.getElementsByClassName("recommend")[i-1];
                this.$service.move(el);
            }
        },
        recommendright(i){
            if(i==5){
                return;
            }else{
                let el = document.getElementsByClassName("recommend")[i+1];
                this.$service.move(el);
            }
        },
        recommendClk(i,v){
            storage.set("downCurrent",{
                index: i,
                class: "recommend"
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
                let el = document.getElementsByClassName("recommend")[0];
                this.$service.move(el);
            }
            if(i==1){
                let el = document.getElementsByClassName("recommend")[2];
                this.$service.move(el);
            }
            if(i==2){
                let el = document.getElementsByClassName("recommend")[4];
                this.$service.move(el);
            }
            let top= 10;
            document.querySelector(".parenting").style.top="-"+top+"rem"
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
    .parenting{
        margin-top:2.5rem;
        margin-left:4rem;
        margin-right:4rem;
        color: #fff;
        position: relative;
        .body{
            margin-top: 2rem;
            width: 87rem;
            height: 42.5rem;
            margin-bottom: 3rem;
            .projectBox{
                width: 87rem;
                height: 24.2rem;
                float: left;
                .project{
                    width: 43rem;
                    height: 24.2rem;
                    float: left;
                    background-color: #fff;
                    img{
                        width: 43rem;
                        height: 24.2rem;
                    }
                }
                .project:first-child{
                    margin-right: 1rem;
                }
            }
            .moreBox{
                width: 87rem;
                height: 11.8rem;
                margin-top: 1rem;
                float: left;
                .videoBox{
                    width: 87rem;
                    height: 11.8rem;
                    float: left;
                    margin-right: 1rem;
                    .video{
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
                    .video:last-child{
                        margin-right: 0rem;
                    }

                }
                .columnBox{
                    width: 43rem;
                    height: 11.8rem;
                    float: left;
                    .column{
                        width: 21rem;
                        height: 11.8rem;
                        float: left;
                        background-color: #fff;
                        img{
                            width: 21rem;
                            height: 11.8rem;
                        }
                    }
                    .column:first-child{
                        margin-right: 1rem;
                    }
                }
            }
            .recommendBox{
                width: 87rem;
                height: 4.5rem;
                float: left;
                margin-top: 1rem;
                display: flex;
                .recommend{
                    width: 13.65rem;
                    height: 4.5rem;
                    margin-right: 1rem;
                    background-color: #fff;
                    img{
                        width: 13.65rem;
                        height: 4.5rem;
                    }
                }
                .recommend:last-child{
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