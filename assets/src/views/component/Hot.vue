<!-- 搜索热门推荐 -->
<template>   
    <div class="hitBox">
        <div class="hitTitle">热门推荐</div>
        <div class="hitListBigBox">
            <div class="hitListBox">
                <div class="hitList"
                    v-items
                    v-for="(v,i) in hitList"
                    :key="i"
                    @up="hitup(i)"
                    @down="hitdown(i)"
                    @left="hitleft(i)"
                    @right="hitright(i)"
                    @click="hitClk(i,v)"
                >
                    <img :src="v.image" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import eventVue  from '../../utils/eventVue'
import storage from '../../utils/localStorage'
import server from '../../services/server.js'

export default {
    data () {
        return {
            hitList:[],
            hitHeight:0
        };
    },

    components: {},

    computed: {},
    created () {
        this.getResultsBrother()
        this.getData()
    },
    mounted(){},

    methods: {
        getData(){
            let params={
                page:1,
                page_size:10
            }
            server.getHot(params).then((ret)=>{
                // console.log(ret.data);
                this.hitList = ret.data.list
            })
        },
        getResultsBrother(){
            eventVue .$on("delHotHeight",(message)=>{   //这里最好用箭头函数，不然this指向有问题
                this.hitHeight = message;
                let resultsList=document.getElementsByClassName("hitListBox")[0];
                resultsList.style.top="-"+this.hitHeight+"rem";
            })  
        },
        hitup(i){
            if(i>=4&&i<this.hitList.length-4){
                let resultsList=document.getElementsByClassName("hitListBox")[0];
                this.hitHeight=this.hitHeight-8.2;
                this.hitHeight>0?this.hitHeight=this.hitHeight:this.hitHeight=0
                resultsList.style.top="-"+this.hitHeight+"rem";
            }else{

            }
            let el = document.getElementsByClassName("hitList")[i-2];
            this.$service.move(el);
            
        },
        hitdown(i){
            // if(i>=this.hitList.length-6){
            //     this.hitList=this.hitList.concat(this.hitList);
            // }
            if(i>=4&&i<this.hitList.length-6){
                let resultsList=document.getElementsByClassName("hitListBox")[0];
                this.hitHeight=this.hitHeight+8.2;
                resultsList.style.top="-"+this.hitHeight+"rem";
            }else{

            }
            let el = document.getElementsByClassName("hitList")[i+2];
            this.$service.move(el);

        },
        hitleft(i){
            if(i%2!=0){
                let el = document.getElementsByClassName("hitList")[i-1];
                this.$service.move(el);
            }else{
                let resultsRightItem = storage.get("resultsRightItem");
                storage.set("hitRightItem",i);
                if(resultsRightItem){
                    let el = document.getElementsByClassName("results")[resultsRightItem];
                    this.$service.move(el);
                    storage.del("resultsRightItem");
                }else{
                    let el = document.getElementsByClassName("results")[0];
                    if(el!=undefined){
                        this.$service.move(el);
                    }else{
                        let els = document.getElementsByClassName("keyboard")[5];
                        this.$service.move(els);
                    }
                }

            }
        },
        hitright(i){
            if(i%2==0){
                let el = document.getElementsByClassName("hitList")[i+1];
                this.$service.move(el);
            }else{
                return;
            }
        },
        hitClk(i,v){
            storage.set("downCurrent",{
                index: i,
                class: "hitList"
            })
            storage.set("historyPath",{
                path:this.$route.path
            })
            this.$router.push({
                path: "/play",
                query: { id: v.id,type:v.type}
            });  
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
.hitBox{
    width: 26.6rem;
    height: 40rem;
    float: left;
    margin-left: 2rem;
    .hitTitle{
        width: 7.2rem;
        height: 1.8rem;
        margin-bottom: 2.6rem;
        font-size: 1.8rem;
        line-height: 1.8rem;
        margin-left: 2rem;
    }
    .hitListBigBox{
        width: 28.6rem;
        height: 42rem;
        position: relative;
        overflow: hidden;
        .hitListBox{
            // width: 26.6rem;
            // height: 40rem;
            margin: 1rem;
            position: absolute;
            top: 0;
            left: 0;
            .hitList{
                width: 12.8rem;
                height: 7.2rem;
                float: left;
                margin-right: 1rem;
                margin-bottom: 1rem;
                background-color: #fff;
                color: red;
                img{
                    width: 12.8rem;
                    height: 7.2rem;
                }
            }
            .hitList:nth-child(2n){
                margin-right: 0rem;
            }
            .hitList:nth-last-child(1),.hitList:nth-last-child(2){
                margin-bottom: 0rem;
            }
        }
    }

    
}
</style>