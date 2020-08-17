<!-- 讲座组件 -->
<template>
    <div class="foot">
        <div class="headBox">
            <span class="head">{{data.title}}</span>
        </div>
        <div class="bodyBoxs">
            <div class="footBody"
                v-for="(v,i) in data.arr"
                :key="i"
                v-items
                @up="lecturesup(i)"
                @down="lecturesdown(i)"
                @left="lecturesleft(i)"
                @right="lecturesright(i)"
                @click="lecturesClk(i,v.id)"
            >
                <img src="" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import storage from '../../utils/localStorage'
export default {
    data () {
        return {
        };
    },
    props:{
        data:{
            type:Object,
            default:() => {
                return {
                    title:'冬病夏治',
                    arr:[
                        {
                            id:"01",
                        },
                        {
                            id:"02",
                        },
                        {
                            id:"03",
                        },
                    ]
                }
                
            }
        },
        lecturesleft:{
            type:Function
        },
        lecturesright:{
            type:Function
        },
        lecturesup:{
            type:Function
        },
        lecturesdown:{
            type:Function
        },
    },

    components: {},

    computed: {},

    mounted(){},

    methods: {
        lecturesClk(num,str){
            storage.set("downCurrent",{
                index: num,
                class: "footBody"
            })
            storage.set("historyPath",{
                path:this.$route.path
            })
            this.$router.push({
                path: "/play"
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
        height: 29.3rem;
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
        .bodyBoxs{
            width: 87rem;
            height: 27rem;
            .footBody{
                width: 16.6rem;
                height: 27rem;
                float: left;
                margin-right: 1rem;
                background-color: #fff;
            }
            .footBody:last-child{
                margin-right: 0rem;
            }
        }
    }
</style>