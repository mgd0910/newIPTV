<!-- 筛选结果 -->
<!-- 
    点击二级导航条，传数据，请求数据
    滚动时判断是哪个数据，请求数据
 -->
<template>

    <div class="contentBox" v-if="bool">
        <div class="content">
            <div class="contentList"
                v-items
                v-for="(v,i) in contentList"
                :key="i"
                @up="contentup(i)"
                @down="contentdown(i)"
                @left="contentleft(i)"
                @right="contentright(i)"
                @click="contentClk(i,v)"
                @focus="contentHorse(i,v)"
                @blur="contentBlur(i,v)"
            >   
                <img :src="v.image" alt="">
                <div class="TitBox">
                    <span class="TitBoxTitle">{{v.title}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import storage from "../../utils/localStorage.js"
import eventVue from "../../utils/eventVue.js"
import server from "../../services/server.js"
import focus from "../../utils/focus.js"
export default {
    data () {
        return {
            bool:true,
            contentList:[],
            height:0,
            label:"",//调接口传的参数（按标签查找）
            departId:"",//调接口传的参数（疾病内容栏目查询）
            labelPage:1,
            scrollPage:1,
            PageSize:16
            
        };
    },
    props:{
        keshiList:{
            type:Array
        }
    },

    components: {},

    computed: {},
 
    created () {
        this.scrollBrother();
        this.getClk();
    },
    mounted(){
        
    },

    methods: {
        scrollBrother(){
            eventVue.$on("delVideoHeight",(message)=>{//这里最好用箭头函数，不然this指向有问题
                this.height = message.height;
                this.label=message.tags;
                this.departId=message.id;
                let content = document.getElementsByClassName("content")[0];
                content.style.top="-"+this.height+"rem";

                // 清除contentList，防止分页加载数据污染
                this.contentList=[];

                if(this.label!=null){
                    let params={
                        page:this.labelPage,
                        page_size:this.PageSize,
                        tags:this.label
                    }
                    this.getSearchToLabel(params)
                    this.departId=null
                }
                if(this.departId!=null){
                    let params={
                        page:this.scrollPage,
                        page_size:this.PageSize,
                        id:this.departId
                    }
                    this.getDiseaseLabel(params)
                    this.label=null
                }
                
            })
        },
        getClk(){
            let params={
                page:1,
                page_size:16,
                id:this.keshiList[0].id
            }
            this.getDiseaseLabel(params)
        },
        getDiseaseLabel(params){
            server.getDiseaseLabel(params).then(ret=>{
                this.contentList=this.contentList.concat(ret.data.list)
                // this.contentList=ret.data.list;
                // console.log(this.contentList);
            })
        },
        getSearchToLabel(params){
            server.getSearchToLabel(params).then(ret=>{
                this.contentList=this.contentList.concat(ret.data.list)
            })
        },
        contentup(i){
            if(i>=4&&i<this.contentList.length-4){
                let content = document.getElementsByClassName("content")[0];
                this.height-=12.9;
                content.style.top="-"+this.height+"rem";
            }else{

            }
            if(i<=3){
                let departSmallDownItem=storage.get("departSmallDownItem");
                if(departSmallDownItem){
                    let el = document.getElementsByClassName("departSmallList")[departSmallDownItem];
                    this.$service.move(el);
                }else{
                    let el = document.getElementsByClassName("departSmallList")[0];
                    this.$service.move(el);
                }
            }
            storage.set("contentUpItem",i)
            let el = document.getElementsByClassName("contentList")[i-4];
            this.$service.move(el);
        },
        contentdown(i){
            if(i>=this.contentList.length-8){
                // this.contentList=this.contentList.concat(this.contentList);
                if(this.label!=null){   
                    // 调label
                    let params={
                        page:++this.labelPage,
                        page_size:this.PageSize,
                        tags:this.label
                    }
                    this.getSearchToLabel(params)
                    // 清除横向导航条的分页页码
                    this.scrollPage=1;
                }else if(this.departId!=null){
                    // 调departId
                    let params={
                        page:++this.scrollPage,
                        page_size:this.PageSize,
                        id:this.departId
                    }
                    this.getDiseaseLabel(params)
                    // 清除纵向导航条的分页页码
                    this.scrollPage=1;
                }else{
                    // 调默认
                    let params={
                        page:++this.scrollPage,
                        page_size:this.PageSize,
                        id:this.keshiList[0].id
                    }
                    this.getDiseaseLabel(params)
                }
            }
            if(i>=4&&i<this.contentList.length-4){
                let content = document.getElementsByClassName("content")[0];
                this.height+=12.9;
                content.style.top="-"+this.height+"rem";
            }else{
                
            }
            let el = document.getElementsByClassName("contentList")[i+4];
            this.$service.move(el);
        },
        contentleft(i){
            if(i%4==0){
                storage.set("contentUpItem",i)
                let scrollListItem = storage.get("scrollListItem");
                if(scrollListItem){
                    let el = document.getElementsByClassName("scrollList")[scrollListItem];
                    this.$service.move(el);
                }else{
                    let el = document.getElementsByClassName("scrollList")[0];
                    this.$service.move(el);
                }
            }else{
                let el = document.getElementsByClassName("contentList")[i-1];
                this.$service.move(el);
            }
        },
        contentright(i){
            if(i%4==3){
                return;
            }else{
                let el = document.getElementsByClassName("contentList")[i+1];
                this.$service.move(el);
            }
        },
        contentClk(i,v){
            storage.set("contentDownCurrent",{
                index: 0,
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
        contentHorse(i,v){
            focus.contentHorse(i,v)
        },
        contentBlur(i,v){
            focus.contentBlur(i,v)
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
        // background:rgba(83,110,252,1) !important;
        position: relative;
        z-index: 1000;
    }
    .contentBox{
        width: 73rem;
        height: 41.2rem;
        float: left;
        overflow: hidden;
        position: relative;
        .content{
            width: 70rem;
            position: absolute;
            margin-left: 3rem;
            margin-top: 2rem;
            top: 0;
            left: 0;
            .contentList{
                width: 16.75rem;
                height: 12.4rem;
                float: left;
                margin-left: 0.5rem;
                margin-top:0.5rem;
                background-color: #fff;
                overflow: hidden;
                img{
                    width: 16.75rem;
                    height: 9.4rem;
                    float: left;
                }
                .TitBox{
                    width: 16.75rem;
                    height:3rem;
                    background-color: #4A4974;
                    color: #fff;
                    font-size: 1.5rem;
                    line-height: 3rem;
                    float: left;
                    position: relative;
                    .TitBoxTitle{
                        margin-left: 1.05rem;
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 1;
                    }
                }
            }
            .contentList:nth-child(4n+0){
                margin-right: 0rem;
            }
        }
    }
</style>