<!-- 筛选组件 -->
<!-- 
    右侧导航栏焦点移动问题：
    top: i=0   移到筛选   ok
         i!=0  移动到i-1     ok 

    down: i=最后一个i  下移失效   ok 
          i!=最后一个  i+1     ok     ////////

    right: 1.先存一个当前导航下标i，   ok
          2.获取本地存储的视频下标   有：跳转到对应视频   ok
                                    无：跳转到第一个   ok 
    left :失效不移动    ok
    
    click：1.隐藏横向导航栏   ok 
           2.字体变色   ok 
           3.清除本地存储当中的视频下标    ok 
           4.视频列表滚动值top清零   ok

    上面的一级导航栏:
    top: 失效不移动   ok 
    down:1.先存当前一个下标(????)    ok
         2.判断存储中有没有二级下标的值  有：跳转到对应下标的二级导航   ok
                                        无：跳转到二级导航的第一个   ok
    left:1.判断当前下标是不是0，是：移动到筛选按钮   ok
                                不是:  i>=4&&i<this.keshiList.length-5 满足？ 是：1.盒子定位值left- 2.i-1   ok 
                                                                              否: i-1    ok

    right: i>=4&&i<this.keshiList.length-5 满足？ 是:1.盒子定位值left+ 2.i+1   ok
                                                  否:i+1     ok

    click：1.二级导航left为0  ok 
           2.二级导航数据更新   ok
           3.清空原来存储的一、二级导航下标   ok
           4.视频栏显示对应一级导航下标的全部视频（请求接口，分页） 
           5.存储一级导航对应下标(??????)   ok
           6.当前一级导航和二级导航变色  ok
           7. 视频栏滚动为0

    二级导航栏
    top :1.存储对应二级导航向上的下标  ok
         2.获取一级导航存储的下标  有：跳转到对应一级导航下标  ok
                                   无：跳转到对应一级导航下标   ok
    down:1.存储当前二级导航对应下标(?????)  ok
         2.焦点移动到视频栏第一个视频   ok
    left和right逻辑与一级导航一样

    click:1.存储二级导航当前下标(??????)    ?????
          2.请求对应数据（更新数据+分页）    ok
          3.视频栏top值为0    ok
    
    视频栏 

            left 判断是不是最左边  是：1.获取存储中的左侧下标  有：跳转对应左侧导航    ok
                                                              无：跳转左侧导航第一个    ok
                                  否：i-1     ok
            right 判断是不是最右边  是：不移动    ok
                                  否：i+1    ok
            top: 
                i>=4&&i<this.contentList.length-4  ?  true:1.盒子定位值top-，2.i-4   ok
                                                      false:i-4    ok

            down: 
                
                i>=this.contentList.length-8 ? true：添加数据   
                                                    fasle:无操作   

                i>=4&&i<this.contentList.length-4  ?  true:1.盒子定位值top+，2.i+4   ok
                                                        false:i+4    ok

    

 -->
<template>
    <div class="scrollRightBox">
        <div class="scrollRightBoxTop">
            <div class="scrollRightBoxTopLogo">
                <img src="../../../static/icon/img_find_tit.png">
            </div>
            <div class="scrollRightBoxTopTitle" 
                v-items
                @up="scrollup()"
                @down="scrolldown()"
                @left="scrollleft()"
                @right="scrollright()"
                @click="scrollClk()"
            >
                <img src="../../../static/icon/icon_filter.png">
                <div class="span">筛选</div>
            </div>
        </div>
        
        <div class="scrollRightBoxBody">
            <div class="scrollRightBoxBodyBig">
                <div class="scrollListBox" 
                    v-for="(v,i) in scrollList"
                    :key="i"
                >
                    <div class="scrollList" 
                        v-items
                        @up="scrollListup(i)"
                        @down="scrollListdown(i)"
                        @left="scrollListleft(i)"
                        @right="scrollListright(i)"
                        @click="scrollListClk(i,v)"
                    >
                        {{v}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import eventVue from "../../utils/eventVue.js"
import storage from "../../utils/localStorage.js"
import server from "../../services/server.js"

export default {
    data () {
        return {
            isAccord:false,
            index:void 0,
            scrollHeigth:0,
            height:0,
            contentlist:[]

        };
    },
    props:{
        scrollList:{
            type:Array
        }
    },
    
    components: {},

    computed: {},
    
    mounted(){
        let el = document.getElementsByClassName("scrollRightBoxTopTitle")[0];
        this.$service.move(el);
        document.getElementsByClassName("span")[0].style.color="#FFD131";
        document.getElementsByClassName("span")[0].style.borderRight="0.2rem solid #FFD131";
    },

    methods: {
        // 兄弟组件传值事件
        brother(){
            eventVue.$emit("isAccord",this.isAccord)   //$emit这个方法会触发一个事件
            this.isAccord=!this.isAccord
            if(!this.isAccord){
                document.getElementsByClassName("span")[0].style.color="#FFD131";
                document.getElementsByClassName("span")[0].style.borderRight="0.2rem solid #FFD131";
                for(let i=0;i<this.scrollList.length;i++){
                    document.getElementsByClassName("scrollListBox")[i].style.color="#FFF";
                    document.getElementsByClassName("scrollListBox")[i].style.borderRight="";
                }
            }else{
                document.getElementsByClassName("span")[0].style.color="";
                document.getElementsByClassName("span")[0].style.borderRight="";
            }
        },
        scrollup(){ 
            let el = document.getElementsByClassName("search")[0];
            this.$service.move(el);
        },
        scrolldown(){
            let el = document.getElementsByClassName("scrollList")[0];
            this.$service.move(el);
        },
        scrollleft(){
            return;
        },
        scrollright(){
            if(document.getElementsByClassName("departBigList")[0]){
                let el = document.getElementsByClassName("departBigList")[0];
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("contentList")[0];
                this.$service.move(el);
            }
        },
        scrollClk(){
            this.brother()
        },
        scrollListup(i){
            if(i>=5&&i<this.scrollList.length-5){
                let resultsList=document.getElementsByClassName("scrollRightBoxBodyBig")[0];
                this.scrollHeigth=this.scrollHeigth-2.8;
                this.scrollHeigth<0?this.scrollHeigth=0:this.scrollHeigth=this.scrollHeigth
                resultsList.style.top="-"+this.scrollHeigth+"rem";
            }else{
                if(i==0){
                    let el = document.getElementsByClassName("scrollRightBoxTopTitle")[0];
                    this.$service.move(el);
                }
            }
            let el = document.getElementsByClassName("scrollList")[i-1];
            this.$service.move(el);
        },
        scrollListdown(i){
            if(i>=5&&i<this.scrollList.length-6){
                 let resultsList=document.getElementsByClassName("scrollRightBoxBodyBig")[0];
                this.scrollHeigth=this.scrollHeigth+2.8;
                resultsList.style.top="-"+this.scrollHeigth+"rem";
            }else{

            }
            let el = document.getElementsByClassName("scrollList")[i+1];
            this.$service.move(el);
        },
        scrollListleft(i){
            return;
        },
        scrollListright(i){
            storage.set("scrollListItem",i);
            let contentUpItem = storage.get("contentUpItem");
            if(contentUpItem){
                let el = document.getElementsByClassName("contentList")[contentUpItem]
                this.$service.move(el);
            }else{
                let el = document.getElementsByClassName("contentList")[0]
                this.$service.move(el);
            }
        },
        scrollListClk(num,str){
            
            eventVue.$emit("isAccord",false)//$emit这个方法会触发一个事件
            this.isAccord=true   
            // 点击哪个给哪个添加颜色
            for(let i=0;i<this.scrollList.length;i++){
                document.getElementsByClassName("scrollListBox")[i].style.color="#FFF";
                document.getElementsByClassName("scrollListBox")[i].style.borderRight="";
            }
            document.getElementsByClassName("span")[0].style.color="";
            document.getElementsByClassName("span")[0].style.borderRight="";
            document.getElementsByClassName("scrollListBox")[num].style.color="#FFD131";
            document.getElementsByClassName("scrollListBox")[num].style.borderRight="0.2rem solid #FFD131";
            
            storage.del("contentUpItem");
            let obj={
                height:this.height,
                tags:str
            }
            eventVue.$emit("delVideoHeight",obj)//传值给视频栏，滚动距离为0,请求参数str
        },

        
        
    }
}

</script>
<style lang='less' scoped>
    
    .focus{
        background-color: #E57613;
        color: #fff !important;
        border-right:none !important ;
    }
    .scrollRightBox{
        width: 14rem;
        height: 47rem;
        float: left;
        .scrollRightBoxTop{
            width: 9.4rem;
            height: 7.8rem;
            margin-left: 2.1rem;
            border-bottom: 0.01rem solid #3F3E67;
            margin-bottom: 1rem;
            .scrollRightBoxTopLogo{
                width: 9.25rem;
                height: 1.75rem;
                margin-top: 1.95rem;
                margin-bottom:3.15rem;
                img{
                    width: 9.25rem;
                    height: 1.75rem;
                }
            }
            .scrollRightBoxTopTitle{
                width: 7rem;
                height: 2.8rem;
                margin-bottom: 1.5rem;
                line-height: 1.5rem;
                margin-left: 1.2rem;
                font-size: 1.5rem;
                border-radius: 1.4rem;
                position: relative;
                img{
                    width: 1.1rem;
                    height: 1.05rem;
                    float: left;
                    margin-top:0.9rem;
                    margin-left: 0.5rem;
                }
                .span{
                    position: absolute;
                    top:0.6rem;
                    left: 2.25rem;
                    float: left;
                    width: 6.3rem;
                    height: 1.5rem;
                }
            }
        }
        .scrollRightBoxBody{
            width: 14rem;
            height: 33rem;
            overflow-y: hidden;
            position: relative;
            .scrollRightBoxBodyBig{
                position: absolute;
                top: 0;
                left: 0;
                .scrollListBox{
                    width: 8.8rem;
                    height: 1.5rem;
                    margin-left: 3.1rem;
                    margin-bottom:1.4rem;
                    font-size: 1.5rem;
                    // border-right: 0.2rem solid #FFD131;
                    position: relative;
                    .scrollList{
                        width: 7rem;
                        height: 2.8rem;
                        line-height: 2.8rem;
                        border-radius: 1.4rem;
                        text-align: center;
                        position: absolute;
                        top: -0.5rem;
                        left: 0;
                    }
                }
                .scrollListBox:first-child{
                    margin-top: 0.5rem;
                }
            }
            
            
            
        }
    }
</style>