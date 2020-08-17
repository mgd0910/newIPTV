<!-- 头部组件 -->
<template>
    <div class="head">
        <div class="logo">
            <img src="../../../static/images/logo.png" alt="" class="logoImg">
        </div>
        <div class="time">
            <div class="timeTitle">{{time}}</div>
            <div class="timeDay">
                <div class="timeDayTop">{{day}}</div>
                <div class="timeDayBottom">{{week}}</div>
            </div>
        </div>
        <div class="middle">
            <div class="search" 
                v-items
                @right="right('search')"
                @left="left('search')"
                @down="down()"
                @click="click('search')"
            >
                <img src="../../../static/images/icon_search.png" alt="">
                <span>搜索</span>
            </div>
            <div class="watch" 
                v-items
                @right="right('watch')"
                @left="left('watch')"
                @down="down()"
                @click="click('watch')"
            >
                <img src="../../../static/images/icon_last.png" alt="">
                <span>近日观看</span>
            </div>
            <div class="collection" 
                v-items
                @right="right('collection')"
                @left="left('collection')"
                @down="down()"
                @click="click('collection')"
            >
                <img src="../../../static/images/icon_shoucang.png" alt="">
                <span>收藏</span>
            </div>
        </div>
    </div>
</template>

<script>
import storage from "../../utils/localStorage"
export default {
data(){
    return {
        time:"",
        day:"",
        week:''
    }
},
components: {},

computed: {},
beforeCreate() {
    setInterval(()=>{
        this.getTime()
    },1000)
},
mounted(){
   
},

methods: {
    getTime(){
        let date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes().toString().padStart(2,0);
        let second = date.getSeconds();
        let week = date.getDay();
        this.time=`${hour}:${minutes}`;
        this.day=`${month}月${day}日`
        switch(week){
            case 0:
                this.week="星期天";
                break;
            case 1:
                this.week="星期一";
                break;
            case 2:
                this.week="星期二";
                break;
            case 3:
                this.week="星期三";
                break;
            case 4:
                this.week="星期四";
                break;
            case 5:
                this.week="星期五";
                break;
            case 6:
                this.week="星期六";
                break;
        }
    },
    right(els){
        switch(els){
            case "search":
                let search=document.getElementsByClassName("watch")[0];
                this.$service.move(search);
            break;
            case "watch":
                let watch=document.getElementsByClassName("collection")[0];
                this.$service.move(watch);
            break;
            default:
            break;
        }
    },
    left(els){
        switch(els){
            case "watch":
                let watch=document.getElementsByClassName("search")[0];
                this.$service.move(watch);
            break;
            case "collection":
                let collection=document.getElementsByClassName("watch")[0];
                this.$service.move(collection);
            break;
            default:
            break;
        }
    },
    down(){
        let navItem=storage.get("navItem")
        if(document.getElementsByClassName("navBoxListTit")[0]){
            if(navItem){
            let el = document.getElementsByClassName("navBoxListTit")[navItem];
            this.$service.move(el);
            storage.del("navItem")
            }else{
                let el = document.getElementsByClassName("navBoxListTit")[0];
                this.$service.move(el);
            }
        }else{
            if(document.getElementsByClassName("playBtn")[0]){
                 let el = document.getElementsByClassName("playBtn")[0];
                this.$service.move(el);
            }
            if(document.getElementsByClassName("scrollRightBoxTopTitle")[0]){
                 let el = document.getElementsByClassName("scrollRightBoxTopTitle")[0];
                this.$service.move(el);
            }
        }
    },
    click(els){
        storage.set("prevNavItem",this.$route.path)
        switch(els){
            case "watch":
                this.$router.push({
                    path: "/record"
                });
            break;
            case "collection":
                this.$router.push({
                    path: "/collect"
                });
            break;

            default:
                this.$router.push({
                    path: "/search"
                });
            break;
        }
    }
}
    
}

</script>
<style lang='less' scoped>
    .focus{
        box-shadow: 0px 0px 0.6rem 0.4rem #FFD131;
    }
    .head{
        color: #fff;
        width: 88rem;
        height: 2.55rem;
        .logo{
            width: 9rem;
            height: 2.55rem;
            float: left;
            .logoImg{
                width: 100%;
                height: 100%;
            }
        }
        .time{
            width: 10rem;
            height: 2.55rem;
            float: right;
            .timeTitle{
                width: 5.7rem;
                height: 1.85rem;
                float: left;
                font-size: 1.85rem;
                text-align: center;
                line-height:1.85rem;
            }
            .timeDay{
                width: 2.7rem;
                height: 1.85rem;
                float: left;
                .timeDayTop{
                    width: 2.7rem;
                    height: 0.925rem;
                    font-size: 0.5rem;
                    line-height: 0.925rem;
                    text-align: center;
                }
                .timeDayBottom{
                    width: 2.7rem;
                    height: 0.925rem;
                    font-size: 0.5rem;
                    line-height: 0.925rem;
                    text-align: center;
                }
            }
        }
        .middle{
            // width: 30rem;
            height: 2.55rem;
            float: right;
            .search{
                width: 7rem;
                margin-right: 1.5rem;
                float: left;
                height: 2rem;
                line-height: 2rem;
                background-color: rgba(255,255,255,0.1);
                border-radius: 1rem;
                text-align: center;
                img{
                   float: left;
                   margin:0.45rem 0.5rem 0 1.5rem;
                }
                span{
                    float: left;
                }
            }
            .collection{
                width: 7rem;
                margin-right: 1.5rem;
                float: left;
                height: 2rem;
                line-height: 2rem;
                background-color: rgba(255,255,255,0.1);
                border-radius: 1rem;
                text-align: center;
                img{
                   float: left;
                   margin:0.45rem 0.5rem 0 1.5rem;
                }
                span{
                    float: left;
                }
            }
            .watch{
                width: 7rem;
                margin-right: 1.5rem;
                float: left;
                height: 2rem;
                line-height: 2rem;
                background-color: rgba(255,255,255,0.1);
                border-radius: 1rem;
                text-align: center;
                img{
                   float: left;
                   margin:0.45rem 0.8rem 0 0.5rem;
                }
                span{
                    float: left;
                }
            }
            
        }
    }

</style>