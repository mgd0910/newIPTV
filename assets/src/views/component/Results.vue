<!-- 搜索结果 -->
<template>
    <div class="resultsBox">
        <div class="resultsBoxTit">猜你喜欢</div>
        <div class="resultsListBox">
            <div class="resultsList">
                <div class="results"
                    v-items
                    v-for="(v,i) in datas"
                    :key="i"
                    @up="resultsup(i)"
                    @down="resultsdown(i)"
                    @left="resultsleft(i)"
                    @right="resultsright(i)"
                    @click="resultsClk(i,v)"
                >
                    <span v-if='datas.lenght==0'>暂无数据</span>
                    <span v-else>{{v.title}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import storage from '../../utils/localStorage'
import eventVue  from '../../utils/eventVue'
import server from '../../services/server.js'
export default {
    data () {
        return {
            datas:[],
            height:0,
            hotHeight:0,
            value:'',
            page:1,
            page_size:15,
            pinyin:""
        };
    },

    components: {},

    computed: {},
    created() {
        this.clearheight()
        let resultsValue = storage.get("resultsValue")
        if(resultsValue){
            let params={
                page:this.page,
                page_size:this.page_size,
                pinyin:resultsValue
            }
            this.getData(params)
        }
    },
    mounted(){},

    methods: {
        clearheight(){
            eventVue.$on("clearHeight",(message)=>{   //这里最好用箭头函数，不然this指向有问题
                console.log(message);
                // 清除存储中的resultsValue,清除datas便于接受新数据,清除value,便于获取新数据
                storage.del("resultsValue")
                this.height = message.height
                this.datas=[]
                console.log(this.height);
                this.value = message.value
                
                if(this.value!=null){
                    let params={
                        page:this.page,
                        page_size:this.page_size,
                        pinyin:this.value
                    }
                    this.getData(params)
                }
            })
        },
        getData(params){
            server.getPinyin(params).then(ret=>{
                this.datas = this.datas.concat(ret.data.list)
            })
        },
        resultsup(i){
            if(i>=4&&i<this.datas.length-4){
                
                let resultsList=document.getElementsByClassName("resultsList")[0];
                this.height=this.height-4.21;
                this.height<0?this.height=0:this.height=this.height
                resultsList.style.top="-"+this.height+"rem";
                
            }else{

            }
            let el = document.getElementsByClassName("results")[i-1];
            this.$service.move(el);
        },
        resultsdown(i){
            if(i>=this.datas.length-6){
                let params={
                    page:++this.page,
                    page_size:this.page_size,
                    pinyin:this.value
                }
                this.getData(params)
            }
            if(i>=4&&i<this.datas.length-5){
                let resultsList=document.getElementsByClassName("resultsList")[0];
                this.height=this.height+4.21;
                resultsList.style.top="-"+this.height+"rem";
            }else{
               
            }
            let el = document.getElementsByClassName("results")[i+1];
            this.$service.move(el);
        },
        resultsleft(i){
            storage.set("resultsItem",i);
            let el =document.getElementsByClassName("empty")[0];
            this.$service.move(el);
        },
        resultsright(i){
            storage.set("resultsRightItem",i);
            let hitRightItem = storage.get("hitRightItem");
            if(hitRightItem){
                let el = document.getElementsByClassName("hitList")[hitRightItem];
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("hitList")[0];
                this.$service.move(el);
            }
        },
        resultsClk(i,v){
            // storage.del("hitRightItem")
            // eventVue.$emit("delHotHeight",this.hotHeight)   //$emit这个方法会触发一个事件
            
            // 存储搜索的结果，便于返回后数据找回
            let resultsValue = storage.get("resultsValue")
            if(resultsValue){
                this.value=resultsValue
            }
            storage.set("resultsValue",this.value)
            //将页码返回到1，便于返回时数据获取
            this.page=1;

            storage.set("downCurrent",{
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
        }
    }
}

</script>
<style lang='less' scoped>
    .focus{
        color: #FFD131;
    }
    .resultsBox{
        width: 26.15rem;
        height: 44.2rem;
        float: left;
        padding-left: 4rem;
        border-right: 0.01rem solid #6f65c1;
        .resultsBoxTit{
            width: 30.15rem;
            height: 1.8rem;
            font-size: 1.8rem;
            line-height: 1.8rem;
            margin-bottom: 2.6rem;
        }
        .resultsListBox{
            width: 22.2rem;
            height: 39.8rem;
            overflow: hidden;
            position: relative;
            .resultsList{
                width: 22.2rem;
                position: absolute;
                top:0;
                left: 0;
                .results{
                    width: 22.2rem;
                    height: 4.2rem;
                    font-size: 1.5rem;
                    line-height: 4.2rem;
                    border-bottom: 0.01rem solid #6F65C1;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                }
            }
        }
    }
</style>