<!-- 最新上线 -->
<template>
    <div class="latest">
        <Head></Head>
        <Nav></Nav>
        <div class="body">
            <Left :fun="goPrev" :leftArrowup="leftArrowup"></Left>
            <div class="videoList">
                <div class="videoBox"
                    v-items
                    v-for="(v,i) in videoList"
                    :key='i'
                    @up="videoup(i)"
                    @down="videodown(i)"
                    @left="videoleft(i)"
                    @right="videoright(i)"
                    @click="videoClk(i,v.id)"
                    @focus="focus(i,v)"
                    @blur="blur(i,v)"
                >
                    <div class="imgBox">
                        <img :src="v.image" alt="">
                    </div>
                    <div class="titleBox">
                        <span class="title">{{v.title}}</span>
                    </div>
                </div>
            </div>
            <Right :fun="goNext" :rightArrowup="rightArrowup"></Right>
        </div>
        <div class="foot">
            <div class="footBox">
                <span class="footBoxTit">{{page}}&nbsp;/&nbsp;{{pages}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import storage from '../utils/localStorage'
import server from "../services/server.js"
import focus from '../utils/focus'

export default {
    data () {
        return {
            videoList:[],
            page:1,
            pages:20,
            params:{page:1,page_size:8}
        };
    },

    components: {
        Head:resolve => {require(['./component/Head.vue'],resolve)},
        Nav:resolve => {require(['./component/Nav.vue'],resolve)},
        Left:resolve => {require(['./component/Left.vue'],resolve)},
        Right:resolve => {require(['./component/Right.vue'],resolve)},
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
            let params=this.params;
            server.getFreeList(params).then(ret=>{
                console.log(ret.data);
                this.videoList=ret.data.list
                this.pages=Math.ceil(ret.data.total/8)  
            })
        },
        catch(){
            // 让对应的导航字变黄，好区分
            let navDoms = document.getElementsByClassName("navBoxListTit")
            for(let i=0;i<navDoms.length;i++){
                navDoms[i].style.color="#fff"
            }
            navDoms[5].style.color="#ffd131"

            let downCurrent = storage.get("downCurrent");
            if(downCurrent){
                let el = document.getElementsByClassName(downCurrent.class)[downCurrent.index];
                this.$service.move(el);
                storage.del("downCurrent");
            }
        },
        videoup(i){
            if(i<4){
                let el = document.getElementsByClassName("navBoxListTit")[5]
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("videoBox")[i-4]
                this.$service.move(el);
            }
        },
        videodown(i){
            if(i>=4){
                return ;
            }else{
                let el = document.getElementsByClassName("videoBox")[i+4]
                this.$service.move(el);
            }
        },
        videoleft(i){
            if(i==0||i==4){
                let el = document.getElementsByClassName("leftArrow")[0]
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("videoBox")[i-1]
                this.$service.move(el);
            }
        },
        videoright(i){
            if(i==3||i==7){
                let el = document.getElementsByClassName("rightArrow")[0]
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("videoBox")[i+1]
                this.$service.move(el);
            }
        },
        videoClk(num,str){
            storage.set("downCurrent",{
                index: 0,
                class: "videoBox"
            })
            storage.set("historyPath",{
                path:this.$route.path
            })
            this.$router.push({
                path: "/play",
                query: { id: str }
            }); 
        },
        goPrev(){
            let el = document.getElementsByClassName("videoBox")[0]
            this.$service.move(el);
            if(this.params.page!=1){
                this.params.page--
            }
            console.log(this.params);
            if(this.page==1){
                return ;
            }else{
                this.page=this.page-1
            }
            this.getData();
        },
        leftArrowup(){
            let el = document.getElementsByClassName("navBoxListTit")[5]
            this.$service.move(el);
        },
        goNext(){
            let el = document.getElementsByClassName("videoBox")[0]
            this.$service.move(el);
            
            console.log(this.params);
            if(this.params.page<this.pages){
                this.page++;
                this.params.page=this.params.page+1;
                this.getData();
            }else{

            } 
           
        },
        rightArrowup(){
            let el = document.getElementsByClassName("navBoxListTit")[5]
            this.$service.move(el);
        },
        focus(i,v){
            focus.horse(i,v)
        },
        blur(i,v){
            focus.blurHorse(i,v)
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
    
    .latest{
        margin-top:2.5rem;
        margin-left:4rem;
        margin-right:4rem;
        color: #fff;
        .body{
            margin-top: 5rem;
            width: 88rem;
            height: 26rem;
            .videoList{
                width: 81.1rem;
                height: 27.4rem;
                float: left;
                .videoBox{
                    width: 19rem;
                    height: 12.7rem;
                    float: left;
                    margin-left: 1.7rem;
                    margin-top:2rem;
                    .imgBox{
                        width: 19rem;
                        height: 10.7rem;
                        img{
                            width: 19rem;
                            height: 10.7rem;
                        }
                    }
                    .titleBox{
                        width: 19rem;
                        height: 2rem;
                        background-color: #3615C9;
                        position: relative;
                        overflow: hidden;
                        .title{
                            font-size: 0.8rem;
                            line-height: 2rem;
                            margin-left: 0.95rem;
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                    }
                }
                .videoBox:nth-child(-n+4){
                    margin-top:0rem;
                }
                 .videoBox:nth-child(1),.videoBox:nth-child(5){
                    margin-left:0rem;
                }
                

            }
        }
        .foot{
            width: 88rem;
            height: 2.5rem;
            margin-top: 4rem;
            .footBox{
                width: 10rem;
                height: 2.5rem;
                background:rgba(255,255,255,0.1);
                border-radius:1.3rem;
                margin-left: 39rem;
                text-align: center;
                line-height: 2.5rem;
                .footBoxTit{
                    width: 3.05rem;
                    height: 0.95rem;
                }
            }
        }
    }
</style>