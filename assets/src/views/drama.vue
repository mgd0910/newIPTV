<!-- 微剧 -->
<template>
    <div class="home">
        <Head></Head>
        <Nav :data="navList"></Nav>
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
                    @click="columnClk(i,v.id)"
                >
                    <span>文字</span>
                </div>
            </div>
            <div class="videoBox">
                <div class="video" 
                    v-items
                    @up="videoup(i)"
                    @down="videodown(i)"
                    @left="videoleft(i)"
                    @right="videoright(i)"
                    @click="videoClk()"
                >
                    <video src="../../static/video/video.mp4" controls="controls" autoplay="autoplay"></video>
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
                    @click="projectClk(i,v.id)"
                >
                    <img src="" alt="">
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
                    @click="lastClk(i,v.id)"
                >
                    <img src="" alt="">
                </div>
            </div>
        </div>
        <Foot 
            :data="footList"
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
export default {
    name:"home",
    components:{
        Head:resolve => {require(['./component/Head.vue'],resolve)},
        Nav:resolve => {require(['./component/Nav.vue'],resolve)},
        Foot:resolve => {require(['./component/Foot.vue'],resolve)},
    },
    data () {
        return {
            navList:[
                {
                    id:"01",
                    title:"首页"
                },
                {
                    id:"02",
                    title:"最新"
                },
                {
                    id:"03",
                    title:"母婴育儿"
                },
                {
                    id:"04",
                    title:"疾病知识"
                },
                {
                    id:"05",
                    title:"传统中医"
                },
                {
                    id:"06",
                    title:"专访讲座"
                },
                {
                    id:"07",
                    title:"微剧"
                },
                {
                    id:"08",
                    title:"健身"
                }
            ],
            columnList:[
                {
                    id:"01",
                },
                {
                    id:"02",
                },
                {
                    id:"03",
                },
                {
                    id:"04",
                },
                {
                    id:"05",
                },
                {
                    id:"06",
                }
            ],
            recommeList:[
                {
                    id:"01",     
                },
                {
                    id:"02",       
                },
                {
                    id:"03",
                },
                {
                    id:"04",
                },
            ],
            projectList:[
                {
                    id:"01",
                },
                {
                    id:"02",
                }
            ],
            footList:{
                title:'冬病夏治',
                arr:[
                    {
                        id:"01",
                    },
                    {
                        id:"02",
                    },
                    {
                        id:"03",
                    },
                ]
            }
        }
    },



    computed: {},
    created() {
        
    },

    mounted(){
        this.catch();
    },

    methods: {
        catch(){
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
                        this.$service.move(footBody);
                        let top= 20;
                        document.querySelector(".home").style.top="-"+top+"rem"
                    break;
                }
                storage.del("downCurrent");
            }
        },
        columnup(i){
            if(i==0){
                let el = document.getElementsByClassName("navBoxListTit")[6];
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("column")[i-1];
                this.$service.move(el);
            }
        },
        columndown(i){
            if(i==5){
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
        columnClk(num,str){
            storage.set("downCurrent",{
                index: num,
                class: "column"
            })
            storage.set("historyPath",{
                path:this.$route.path
            })
            this.$router.push({
                path: "/play"
            });
        },

        videoup(i){
            let el = document.getElementsByClassName("navBoxListTit")[6];
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
            storage.set("downCurrent",{
                index: 0,
                class: "video"
            })
            storage.set("historyPath",{
                path:this.$route.path
            })
            this.$router.push({
                path: "/play"
            });
        },
        projectup(i){
            if(i==0){
                let el = document.getElementsByClassName("navBoxListTit")[6];
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
        projectClk(num,str){
            storage.set("downCurrent",{
                index: num,
                class: "project"
            })
            storage.set("historyPath",{
                path:this.$route.path
            })
            this.$router.push({
                path: "/play"
            });
        },
        lastup(i){
            if(i==0){
                let el = document.getElementsByClassName("column")[5];
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
            let top= 20;
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
        lastClk(num,str){
            storage.set("downCurrent",{
                index: num,
                class: "last"
            })
            storage.set("historyPath",{
                path:this.$route.path
            })
            this.$router.push({
                path: "/play"
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
            document.querySelector(".home").style.top=0+"rem"
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
        background-color: rgba(255, 102, 0, 1) !important;
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
                    height: 3.55rem;
                    margin-bottom: 0.5rem;
                    background:rgba(116,113,160,1);
                    font-size: 1.2rem;
                    line-height: 3.55rem;
                    span{
                        margin-left: 1rem;
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
