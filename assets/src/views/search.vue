<!-- 搜索 -->
<template>
    <div class="search">
        <div class="body">
            <Search></Search>
            <Results></Results>
            <Hot></Hot>
        </div>
    </div>
</template>

<script>
import storage from "../utils/localStorage"

export default {
    data () {
        return {

        };
    },

    components: {
        Search:resolve => {require(['./component/Search.vue'],resolve)},
        Results:resolve => {require(['./component/Results.vue'],resolve)},
        Hot:resolve => {require(['./component/Hot.vue'],resolve)},
    },

    computed: {},
    
    mounted(){},

    methods: {
        serviceBack(){
            storage.del("resultsValue")
            let router=storage.get("prevNavItem");
            this.$router.push({
                path: router
            });
        },
        
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
    .search{
        margin-left: 4rem;
        margin-top: 3.45rem;
        margin-right: 4rem;
        color: #fff;
        .body{
            width: 88rem;
            height: 44.2rem;
        }
    }
</style>