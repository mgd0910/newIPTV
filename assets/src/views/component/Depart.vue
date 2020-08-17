<!-- 科室导航组件 -->
<template>
    <div class="depart" v-if="isAccord">
        <div class="departBig">
            <div class="departBigList"
                v-items
                v-for="(v,i) in keshiList"
                :key="i"
                @up="departBigup(i)"
                @down="departBigdown(i)"
                @left="departBigleft(i)"
                @right="departBigright(i)"
                @click="departBigClk(i,v.id)"
            >
                {{v.title}}
            </div>
        </div>
        <div class="departSmall" v-if="SmallList.length>0">
            <div class="departSmallList"
                v-items
                v-for="(v,i) in SmallList"
                :key="i"
                @up="departSmallup(i)"
                @down="departSmalldown(i)"
                @left="departSmallleft(i)"
                @right="departSmallright(i)"
                @click="departSmallClk(i,v.id)"
            >
                {{v.title}}
            </div>
        </div>
    </div>
</template>

<script>
import storage from "../../utils/localStorage.js"
import eventVue from "../../utils/eventVue.js"

export default {
    data () {
        return {
            isAccord:true,
            width:0,
            smallwidth:0,
            all:{
                title:'全部'
            },
            SmallList:[],
            height:0,
        };
    },
    props:{
        keshiList:{
            type:Array
        }
    },

    components: {},
    created () {
        this.brother();
        this.SmallList=this.keshiList[0].child
    },
    computed: {},

    mounted(){
        document.getElementsByClassName("departBigList")[0].style.color="#FFD131";
        document.getElementsByClassName("departSmallList")[0].style.color="#FFD131";
    },

    methods: {
        
        brother(){
            eventVue .$on("isAccord",(message)=>{//这里最好用箭头函数，不然this指向有问题
                 this.isAccord = message      
            })
        },
        departBigup(i){
            let el = document.getElementsByClassName("search")[0];
            this.$service.move(el);
        },
        departBigdown(i){
            storage.set("departBigDownItem",i)
            let departSmallUpItem = storage.get("departSmallUpItem")
            if(departSmallUpItem){
                let el = document.getElementsByClassName("departSmallList")[departSmallUpItem];
                this.$service.move(el);
                storage.del("departSmallUpItem")
            }else{
                let el = document.getElementsByClassName("departSmallList")[0];
                this.$service.move(el);
            }
        },
        departBigleft(i){
            if(i>=4&&i<this.keshiList.length-5){
                let departBigList = document.getElementsByClassName("departBig")[0];
                this.width-=7;
                departBigList.style.left="-"+this.width+"rem";
            }else{
                if(i==0){
                    let el = document.getElementsByClassName("scrollRightBoxTopTitle")[0];
                    this.$service.move(el);
                }
            }
            let el = document.getElementsByClassName("departBigList")[i-1];
            this.$service.move(el);
        },
        departBigright(i){
            if(i>=4&&i<this.keshiList.length-5){
                let departBigList = document.getElementsByClassName("departBig")[0];
                this.width+=7;
                departBigList.style.left="-"+this.width+"rem";
            }else{
                
            }
            let el = document.getElementsByClassName("departBigList")[i+1];
            this.$service.move(el);
        },
        departBigClk(num,str){
            // 请求接口拿数据
            this.SmallList=this.keshiList[num].child;
            // 这里要请求接口，获取数据，获取到的数据用兄弟组件传值传给视频栏显示

            //传值给视频栏，滚动距离为0，传请求参数
            let obj={
                height:this.height,
                id:str
            }
            console.log(obj);
            eventVue.$emit("delVideoHeight",obj)

            //清空一二级导航存储下标
            storage.del("departSmallUpItem");
            storage.del("departBigDownItem")
            let departSmallList = document.getElementsByClassName("departSmall")[0];
            departSmallList.style.left=0+"rem";
            this.smallwidth=0;
            
            // 存储当前的一级导航下标
            storage.set("departBigDownItem",num)

            // 存储点击的以及导航下标
            storage.set("departBigDownItemClk",num)


            for(let i=0;i<this.keshiList.length;i++){
                document.getElementsByClassName("departBigList")[i].style.color="#FFF";
            }
            let departSmallListDoms=document.getElementsByClassName("departSmallList")
            for(let i=0;i<departSmallListDoms.length;i++){
                departSmallListDoms[i].style.color="#fff";
            }
            document.getElementsByClassName("departBigList")[num].style.color="#FFD131";
            document.getElementsByClassName("departSmallList")[0].style.color="#FFD131";
        },
        departSmallup(i){
            storage.set("departSmallUpItem",i)
            let departBigDownItem = storage.get("departBigDownItem");
            if(departBigDownItem){
                let el = document.getElementsByClassName("departBigList")[departBigDownItem];
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("departBigList")[0];
                this.$service.move(el);
            }
        },
        departSmalldown(i){
            storage.set("departSmallDownItem",i)
            let el = document.getElementsByClassName("contentList")[0];
            this.$service.move(el);
        },
        departSmallleft(i){
            if(i>=4&&i<this.SmallList.length-5){
                let departSmallList = document.getElementsByClassName("departSmall")[0];
                this.smallwidth-=7;
                departSmallList.style.left="-"+this.smallwidth+"rem";
            }else{
                if(i==0){
                    let el = document.getElementsByClassName("scrollRightBoxTopTitle")[0];
                    this.$service.move(el);
                }
            }
            let el = document.getElementsByClassName("departSmallList")[i-1];
            this.$service.move(el);
        },
        departSmallright(i){
            if(i>=4&&i<this.SmallList.length-5){
                let departSmallList = document.getElementsByClassName("departSmall")[0];
                this.smallwidth+=7;
                departSmallList.style.left="-"+this.smallwidth+"rem";
            }else{
                
            }
            let el = document.getElementsByClassName("departSmallList")[i+1];
            this.$service.move(el);
        },
        departSmallClk(num,str){
            storage.set("departSmallDownItem",num)
            
            // 这里发送请求获取二级导航对应下标下的视频 ，成功后用兄弟组件传值 传给视频栏
            
            //传值给视频栏，滚动距离为0，传请求参数
            if(str==0){
                let num = storage.get("departBigDownItemClk")
                str = this.keshiList[num].id
            }
            let obj={
                height:this.height,
                id:str
            }
            console.log(obj);
            eventVue.$emit("delVideoHeight",obj)

            for(let i=0;i<this.SmallList.length;i++){
                document.getElementsByClassName("departSmallList")[i].style.color="#fff";
            }
            document.getElementsByClassName("departSmallList")[num].style.color="#FFD131";
        }

    }
}

</script>
<style lang='less' scoped>
    .focus{
        background-color: #E57613;
        color: #fff !important;
    }
    .depart{
        width: 70rem;
        height: 6rem;
        float: left;
        margin-left: 3rem;
        overflow: hidden;
        position: relative;
        // background-color: deeppink;
        .departBig{
            width: 900rem;
            height: 2.8rem;
            margin-bottom: 0.4rem;
            position: absolute;
            top: 0;
            left: 0;
            // background-color: dodgerblue;
            .departBigList{
                width: 8rem;
                height: 2.8rem;
                // margin-right: 0.5rem;
                float: left;
                border-radius: 1.4rem;
                line-height: 2.8rem;
                text-align: center;
                font-size: 1.5rem;
                // background-color: greenyellow;
            }
        }
        .departSmall{
            width: 90rem;
            height: 2.8rem;
            position: absolute;
            top: 3.2rem;
            left: 0;
            // background-color: gold;
            .departSmallList{
                width: 7rem;
                height: 2.8rem;
                float: left;
                border-radius: 1.4rem;
                line-height: 2.8rem;
                text-align: center;
                font-size: 1.5rem;
            }
        }
    }
</style>