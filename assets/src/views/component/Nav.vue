<!-- 导航条 -->
<template>
    <div class="nav">
        <ul class="navBox">
            <li class="navBoxList" v-for="(v,i) in navList" :key="i">
                <span class="navBoxListTit" 
                    v-items
                    @right="right(i)"
                    @left="left(i)"
                    @up="up(i)"
                    @down="down(i,v.key)"
                >{{v.title}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import storage from '../../utils/localStorage'
import server from "../../services/server.js"
export default {
    data () {
        return {
            navList:[],
            routes:[],
        };
    },
    components: {},

    computed: {},
    created () {
        this.getData()
    },  
    mounted(){
        
    },
    methods: {
        getData(){
            let params={};
            server.getNav(params).then(ret=>{
                this.navList=ret.data;
                this.navList.forEach(v=>{
                    let key = "/"+v.key
                    this.routes.push(key);
                })
                setTimeout(() => {
                    this.getFirstFocus();
                }, 50);
            })
        },
        //获取导航第一个元素为默认焦点
        getFirstFocus(){
            let router=this.$route.path;
            for(let i=0;i<this.routes.length;i++){
                if(router==this.routes[i]){
                    let el = document.getElementsByClassName("navBoxListTit")[i];
                    this.$service.move(el);
                }   
            }
        },
        right(i,str){
            if(i<this.routes.length-1){
                storage.set("navNum",i+1)
                this.$router.push({
                    path: this.navList[i+1].key
                });
                let el = document.getElementsByClassName("navBoxListTit")[i+1]
                this.$service.move(el);
            }else{
                return;
            }
        },
        left(i){
            if(i>0){
                storage.set("navNum",i-1)
                this.$router.push({
                    path: this.routes[i-1]
                });
                let el = document.getElementsByClassName("navBoxListTit")[i-1]
                this.$service.move(el);
            }else{
                return;
            }
        },
        up(i){
            storage.set("navItem",i);
            let el = document.getElementsByClassName("search")[0]
            this.$service.move(el);
        },
        down(num,str){
            console.log(num,str);
            switch(str){
                case "index":
                    let column = document.getElementsByClassName("column")[0];
                    this.$service.move(column);
                break;
                case "new-course":
                    let videoBox = document.getElementsByClassName("videoBox")[0];
                    this.$service.move(videoBox);
                break;
                case "maternal":
                    let maternal = document.getElementsByClassName("project")[0];
                    this.$service.move(maternal);
                break;
                case "disease":
                    let disease = document.getElementsByClassName("project")[0];
                    this.$service.move(disease);
                break;
                case "tcm":
                    let tcm = document.getElementsByClassName("project")[0];
                    this.$service.move(tcm);
                break;
                case "free":
                    let free = document.getElementsByClassName("videoBox")[0];
                    this.$service.move(free);
                break;
            }
        }
    }
}

</script>
<style lang='less' scoped>
    .focus{
        display: block;
        color: #FFD131;
        // border-bottom: 0.1rem solid #FFD131;
        // box-shadow: 0rem 0.2rem 0.05rem -0.02rem #FFD131;
        background-image: url("../../../static/images/borderBbi.png");
        background-repeat:no-repeat;
        background-position: bottom center;
    }
    .nav{
        color: #fff;
        width: 88rem;
        height: 2.6rem;
        margin-top:1.9rem;
        .navBox{
            width: 87rem;
            height: 2.55rem;
            list-style: none;
            text-align: center;
            line-height: 2.55rem;
            display: flex;
            justify-content:space-between;
            .navBoxList{
                float: left;
                width: 6.5rem;      
                font-size: 1.5rem;  
                margin-right: 3.1rem;
                .navBoxList:last-child{
                    margin-right: 0rem;
                }
                .navBoxListTit{
                    border:none;
                    padding-bottom: 0.7rem;
                }
            }
        }
    }
    .navBoxList:last-child{
        margin-right: 0rem !important;
    }
</style>