<!-- 疾病筛选 -->
<template>
    <div class="screening">
        <Head></Head>
        <div class="body">
            <Screening :scrollList="scrollList" v-if="scrollList.length>0"></Screening>
            <Depart :keshiList="keshiList" v-if="keshiList.length>0"></Depart>
            <Content :keshiList="keshiList" v-if="scrollList.length>0&&keshiList.length>0"></Content>
        </div>
    </div>
</template>

<script>
import storage from '../utils/localStorage';
import server from "../services/server.js"

export default {
    data () {
        return {
            scrollList:[],
            keshiList:[]
        };
    },

    components: {
        Head:resolve => {require(['./component/Head.vue'],resolve)},
        Screening:resolve => {require(['./component/Screening.vue'],resolve)},
        Depart:resolve => {require(['./component/Depart.vue'],resolve)},
        Content:resolve => {require(['./component/Content.vue'],resolve)},
    },

    computed: {},
    created () {
        this.getData();
    },
    mounted(){},

    methods: {
        getData(){
            server.getDisease().then(ret=>{
                this.scrollList = ret.data.tag_list
                this.keshiList = ret.data.category_list
            })
        },
        catch(){
            let contentDownCurrent = storage.get("contentDownCurrent");
            if(contentDownCurrent){
                let contentDownCurrent = document.getElementsByClassName("recommend")[contentDownCurrent.index];
                this.$service.move(contentDownCurrent);
                storage.del("contentDownCurrent");
            }else{
                let el = document.getElementsByClassName("scrollRightBoxTopTitle")[0];
                this.$service.move(el);
                document.getElementsByClassName("span")[0].style.color="#FFD131";
                document.getElementsByClassName("span")[0].style.borderRight="0.2rem solid #FFD131";
            }
        },
        serviceBack(){
            let path = storage.get("diseaseHistoryPath");
            if(path){
                console.log(path);
                this.$router.push({
                    path: path.path
                });
                storage.del("diseaseHistoryPath");
            }
        }
    }
}

</script>
<style lang='less' scoped>
    .screening{
        margin-left: 4.5rem;  
        margin-top: 2rem;
        margin-right: 4.5rem;
        color: #fff;
        .body{
            width: 87rem;
            height: 47rem;
            margin-top: 1.95rem;
            // background-color: aqua;
            
        }
    }
</style>