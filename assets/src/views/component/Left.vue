<!-- 左箭头 -->
<template>
    <div class="leftArrowBox">
        <!-- <img v-items class="leftArrow" src="../../static/images/arrow_prev.png"> -->
        <div class="leftArrow" 
            v-items 
            @click="fun"
            @up="leftArrowup()"

        >
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    props:{
        fun:{
            type:Function
        },
        leftArrowup:{
            type:Function
        }

    },

    components: {},

    computed: {},

    mounted(){},

    methods: {
        
    }
}

</script>
<style lang='less' scoped>
    .focus{
        background-image: url("../../../static/icon/arrow_left_onfocus.png") !important;
        -moz-transform:scale(1.1,1.1); 
        -webkit-transform:scale(1.1,1.1); 
        -o-transform:scale(1.1,1.1); 
    }
    .leftArrowBox{
        width:3.5rem ;
        height:26rem;
        float: left;
        .leftArrow{
            width:1.5rem ;
            height: 3rem;
            margin-top: 11.5rem;
            background-image: url("../../../static/icon/arrow_left.png");
            background-size:100% 100%;
        }
    }
</style>