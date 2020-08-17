<!-- 健身 -->
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
                    @click="projectClk(i,v.id)"
                >
                    <img src="" alt="">
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
                        @click="videoClk(i,v.id)"
                    >
                        <img src="" alt="">
                    </div>
                </div>
                <div class="columnBox">
                    <div class="column"
                        v-items
                        v-for="(v,i) in columnList"
                        :key="i"
                        @up="columnup(i)"
                        @down="columndown(i)"
                        @left="columnleft(i)"
                        @right="columnright(i)"
                        @click="columnClk(i,v.id)"
                    >
                        <img src="" alt="">
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
                    @click="recommendClk(i,v.id)"
                >
                    {{v.title}}
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
import storage from '../utils/localStorage';

export default {
    data () {
        return {
            projectList:[
                {
                    id:"01",
                },
                {
                    id:"02",
                },
            ],
            videoList:[
                {
                    id:"01",
                },
                {
                    id:"02",
                },
            ],
            columnList:[
                {
                    id:"01",
                },
                {
                    id:"02",
                },
            ],
            recommendList:[
                {
                    id:"01",
                    title:'太极拳'
                },
                {
                    id:"02",
                    title:'广场舞'
                },
                {
                    id:"03",
                    title:'瑜伽'
                },
                {
                    id:"04",
                    title:'健身'
                },
                {
                    id:"05",
                    title:'减肥'
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
        };
    },

    components: {
        Head:resolve => {require(['./component/Head.vue'],resolve)},
        Nav:resolve => {require(['./component/Nav.vue'],resolve)},
        Foot:resolve => {require(['./component/Foot.vue'],resolve)},
    },

    computed: {

    },

    mounted(){
        this.catach()
    },

    methods: {
        catach(){
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
            let el = document.getElementsByClassName("navBoxListTit")[7];
            this.$service.move(el);
        },
        projectdown(i){
            if(i==0){
                let el = document.getElementsByClassName("video")[0];
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("column")[0];
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
        videoup(i){
            let el = document.getElementsByClassName("project")[0];
            this.$service.move(el);
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
            if(i==1){
                let el = document.getElementsByClassName("column")[0];
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("video")[i+1];
                this.$service.move(el);
            }
        },
        videoClk(num,str){
            storage.set("downCurrent",{
                index: num,
                class: "video"
            })
            storage.set("historyPath",{
                path:this.$route.path
            })
            this.$router.push({
                path: "/play"
            });
        },
        columnup(i){
            let el = document.getElementsByClassName("project")[1];
            this.$service.move(el);
        },
        columndown(i){
            let el = document.getElementsByClassName("recommend")[i+3];
            this.$service.move(el);
        },
        columnleft(i){
            if(i==1){
                let el = document.getElementsByClassName("column")[i-1];
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("video")[1];
                this.$service.move(el);
            }
        },
        columnright(i){
            if(i==0){
                let el = document.getElementsByClassName("column")[i+1];
                this.$service.move(el);
            }else{
                return;
            }
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
                let el = document.getElementsByClassName("column")[0];
                this.$service.move(el);
            }
            let top= 0;
            document.querySelector(".parenting").style.top="-"+top+"rem"
        },
        recommenddown(i){
            if(i==0||i==1){
                let el = document.getElementsByClassName("footBody")[0];
                this.$service.move(el);
            }
            if(i==2){
                let el = document.getElementsByClassName("footBody")[1];
                this.$service.move(el);
            }
            if(i==3||i==4){
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
            if(i==4){
                return;
            }else{
                let el = document.getElementsByClassName("recommend")[i+1];
                this.$service.move(el);
            }
        },
        recommendClk(num,str){
            storage.set("downCurrent",{
                index: num,
                class: "recommend"
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
                let el = document.getElementsByClassName("recommend")[0];
                this.$service.move(el);
            }
            if(i==1){
                let el = document.getElementsByClassName("recommend")[2];
                this.$service.move(el);
            }
            if(i==2){
                let el = document.getElementsByClassName("recommend")[3];
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
                    width: 43rem;
                    height: 11.8rem;
                    float: left;
                    margin-right: 1rem;
                    .video{
                        width: 21rem;
                        height: 11.8rem;
                        float: left;
                        background-color: #fff;
                        img{
                            width: 21rem;
                            height: 11.8rem;
                        }
                    }
                    .video:first-child{
                        margin-right: 1rem;
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
                    width: 16.6rem;
                    height: 4.5rem;
                    margin-right: 1rem;
                    background:rgba(116,113,160,1);
                    font-size: 1.5rem;
                    text-align: center;
                    line-height: 4.5rem;
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