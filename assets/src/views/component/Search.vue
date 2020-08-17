<!-- 搜索组件 -->
<template>
    <div class="searchBox">
        <div class="topIput">
            <img src="../../../static/icon/icon_search_small.png" alt="">
            <div>{{value}}</div>
        </div>
        <div class="keyboardBox">
            <div class="keyboard" 
                v-items
                v-for="(v,i) in keyboardList"
                :key="i"
                @up="keyboardup(i)"
                @down="keyboarddown(i)"
                @left="keyboardleft(i)"
                @right="keyboardright(i)"
                @click="keyboardClk(i,v)"
            >
                {{v}}
            </div>
        </div>
        <div class="textKeyboardBox">
            <div class="delete"
                v-items
                @up="deleteup()"
                @down="deletedown()"
                @left="deleteleft()"
                @right="deleteright()"
                @click="deleteClk()"
            >
                <img src="../../../static/icon/icon_backspace.png" alt="">
                <div>删除</div>
            </div>
            <div class="empty"
                v-items
                @up="emptyup()"
                @down="emptydown()"
                @left="emptyleft()"
                @right="emptyright()"
                @click="emptyClk()"
            >
                <img src="../../../static/icon/icon_del.png" alt="">
                <div>清空</div>
            </div>
        </div>
    </div>
</template>

<script>
import storage from '../../utils/localStorage'
import eventVue  from '../../utils/eventVue'
export default {
    data () {
        return {
            keyboardList:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
            value:'',
            height:0,
            hotHeight:0
        };
    },

    components: {},

    computed: {},

    mounted(){
        let el = document.getElementsByClassName("keyboard")[0]
        this.$service.move(el);
    },

    methods: {
        keyboardup(i){
            if(i<=5){
                return ;
            }else{
                let el = document.getElementsByClassName("keyboard")[i-6];
                this.$service.move(el);
            }
        },
        keyboarddown(i){
            if(i<=18){
                let el = document.getElementsByClassName("keyboard")[i+6]
                this.$service.move(el);
            }
            if(i>=19&&i<=23){
                let el = document.getElementsByClassName("keyboard")[25]
                this.$service.move(el);
            }
            if(i==24||i==25){
                let el = document.getElementsByClassName("delete")[0]
                this.$service.move(el);
            }
        },
        keyboardleft(i){
            if(i%6==0){
                return ;
            }else{
                let el = document.getElementsByClassName("keyboard")[i-1]
                this.$service.move(el);
            }
        },
        keyboardright(i){
            if(i==5||i==25||i==11|i==17){
                // 先获取缓存中的搜索结果，如果有跳到，没有默认执行
                let resultsItem = storage.get("resultsItem");
                if(resultsItem){
                    console.log("b");
                    let el= document.getElementsByClassName("results")[resultsItem];
                    this.$service.move(el);
                }else{
                    
                    let el= document.getElementsByClassName("results")[0];
                    if(el!=undefined){
                        this.$service.move(el);
                    }else{
                        let els = document.getElementsByClassName("hitList")[0];
                        this.$service.move(els);
                    }
                    
                    
                }
            }else{
                console.log("d");
                let el = document.getElementsByClassName("keyboard")[i+1]
                this.$service.move(el);
            }
        },
        keyboardClk(i,v){
            storage.del("resultsItem");
            let resultsList=document.getElementsByClassName("resultsList")[0];
            resultsList.style.top=0+"rem";
            this.value=this.value+v;
            let obj={
                height:this.height,
                value:this.value
            }
            eventVue.$emit("clearHeight",obj)   //$emit这个方法会触发一个事件
            // eventVue.$emit("delHotHeight",this.hotHeight)   //$emit这个方法会触发一个事件
            storage.del("hitRightItem")

        },
        deleteup(){
            let el =document.getElementsByClassName("keyboard")[24];
            this.$service.move(el);
        },
        deletedown(){
            return;
        },
        deleteleft(){
            return;
        },
        deleteright(){
            let el =document.getElementsByClassName("empty")[0];
            this.$service.move(el);
        },
        deleteClk(){
            storage.del("resultsItem");
            let resultsList=document.getElementsByClassName("resultsList")[0];
            resultsList.style.top=0+"rem";
            this.value=this.value.substr(0, this.value.length - 1);
            let obj={
                height:this.height,
                value:this.value
            }
            eventVue.$emit("clearHeight",obj)   //$emit这个方法会触发一个事件
            
            // eventVue.$emit("delHotHeight",this.hotHeight)   //$emit这个方法会触发一个事件
            storage.del("hitRightItem")
        },
        emptyup(){
            let el =document.getElementsByClassName("keyboard")[24];
            this.$service.move(el);
        },
        emptydown(){
            return;
        },
        emptyleft(){
            let el =document.getElementsByClassName("delete")[0];
            this.$service.move(el);
        },
        emptyright(){
            // 先获取缓存中的搜索结果，如果有跳到，没有默认执行
            let resultsItem = storage.get("resultsItem");
            if(resultsItem){
                let el= document.getElementsByClassName("results")[resultsItem];
                this.$service.move(el);
            }else{
                let el= document.getElementsByClassName("results")[0];
                this.$service.move(el);
            }
        },
        emptyClk(){
            storage.del("resultsItem");
            let resultsList=document.getElementsByClassName("resultsList")[0];
            resultsList.style.top=0+"rem";
            this.value=''
            let obj={
                height:this.height,
                value:this.value
            }
            eventVue.$emit("clearHeight",obj)   //$emit这个方法会触发一个事件
            
            // eventVue.$emit("delHotHeight",this.hotHeight)   //$emit这个方法会触发一个事件
            storage.del("hitRightItem")
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
        background:rgba(83,110,252,1) !important;
    }
    .searchBox{
        width:27.2rem ;
        height: 44.2rem;
        float: left;
        background-color: #03011D;
        .topIput{
            width:23.2rem ;
            height: 4.2rem;
            margin-bottom: 1.4rem;
            img{
                width: 1.2rem;
                height: 1.2rem;
                display: inline-block;
                margin-top: 1.5rem;
                margin-right: 1rem;
                float: left;
            }
            div{
                width: 21rem;
                height: 1.8rem;
                float: left;
                margin-top: 1.2rem;
                font-size: 1.8rem;
                line-height: 1.4rem;
            }
        }
        .keyboardBox{
            width: 23.2rem;
            height: 19.25rem;
            .keyboard{
                width: 3.45rem;
                height: 3.45rem;
                margin-right: 0.5rem;
                margin-bottom: 0.5rem;
                float: left;
                font-size: 1.5rem;
                text-align: center;
                line-height: 3.45rem;
                background:rgba(83,110,252,0.3);
                border-radius: 0.4rem;
            }
            .keyboard:nth-child(6n+0){
                margin-right: 0rem;
            }
            .keyboard:nth-last-child(1),.keyboard:nth-last-child(2){
                margin-bottom: 0rem;
            }
        }
        .textKeyboardBox{
            width: 23.2rem;
            height: 4.2rem;
            margin-top: 0.5rem;
            .delete{
                width: 11.35rem;
                height: 4.2rem;
                float: left;
                margin-right: 0.5rem;
                border-radius: 0.4rem;
                background:rgba(83,110,252,0.3);
                img{
                    width: 1.7rem;
                    height: 1.1rem;
                    float: left;
                    margin-left: 2.9rem;
                    margin-top: 1.55rem;
                    margin-right: 0.5rem;
                }
                div{
                    width: 2.95rem;
                    height: 1.45rem;
                    float: left;
                    margin-top: 1.4rem;
                }
            }
            .empty{
                width: 11.35rem;
                height: 4.2rem;
                background:rgba(83,110,252,0.3);
                float: left;
                border-radius: 0.4rem;
                img{
                    width: 1.1rem;
                    height: 1.2rem;
                    float: left;
                    margin-left: 2.9rem;
                    margin-top: 1.45rem;
                    margin-right: 0.5rem;
                }
                div{
                    width: 2.95rem;
                    height: 1.45rem;
                    float: left;
                    margin-top: 1.4rem;
                }
            }
        }
    }
</style>