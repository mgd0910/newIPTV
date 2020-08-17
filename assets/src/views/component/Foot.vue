<!-- 最下面的组件 -->
<template>
    <div class="foot">
        <div class="headBox">
            <span class="head">{{footList.category.name}}</span>
        </div>
        <div class="bodyBox">
            <div class="footBody"
                v-for="(v,i) in footList.content"
                :key="i"
                v-items
                @up="footup(i)"
                @down="footdown(i)"
                @left="footleft(i)"
                @right="footright(i)"
                @click="footClk(i,v)"
            >
                <img :src="v.image" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import storage  from '../../utils/localStorage'

export default {
    data () {
        return {
        };
    },
    props:{
        footList:{
            type:Object,
        },
        footleft:{
            type:Function
        },
        footright:{
            type:Function
        },
        footup:{
            type:Function
        },
        footdown:{
            type:Function
        },
    },

    components: {},

    computed: {},

    mounted(){
        
    },

    methods: {
        footClk(i,v){
            storage.set("downCurrent",{
                index: i,
                class: "footBody"
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
    .foot{
        width: 87rem;
        height: 20.1rem;
        margin-bottom:3rem;
        
        .headBox{
            width: 87rem;
            height: 2.3rem;
            margin-bottom:1.9rem;
            .head{
                width: 9.4rem;
                height: 2.3rem;
                font-size:2.2rem;
                line-height: 2.3rem;
                text-align: center;
            }
        }
        .bodyBox{
            width: 87rem;
            height: 15.9rem;
            .footBody{
                width: 28.3rem;
                height: 15.9rem;
                float: left;
                margin-right: 1rem;
                background-color: #fff;
                img{
                    width: 28.3rem;
                    height: 15.9rem;
                }
            }
            .footBody:last-child{
                margin-right: 0rem;
            }
        }
    }
</style>