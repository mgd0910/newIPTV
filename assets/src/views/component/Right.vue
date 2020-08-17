<!-- 右箭头 -->
<template>
    <div class="rightArrowBox">
        <!-- <img v-items class="rightArrow" src="../../static/images/arrow_prev.png"> -->
        <div class="rightArrow" 
            v-items 
            @click="fun"
            @up="rightArrowup()"
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
props: {
    fun:{
        type:Function
    },
    rightArrowup:{
        type:Function
    }
},

components: {},

computed: {},

mounted(){},

methods: {}
}

</script>
<style lang='less' scoped>
    .focus{
        background-image: url("../../../static/icon/arrow_right_onfocus.png") !important;
        -moz-transform:scale(1.1,1.1); 
        -webkit-transform:scale(1.1,1.1); 
        -o-transform:scale(1.1,1.1); 
    }
    .rightArrowBox{
        width:3.4rem ;
        height:26rem;
        float: right;
        .rightArrow{
            width:1.5rem;
            height: 3rem;
            margin-top: 11.5rem;
            float: right;
            background-image: url("../../../static/icon/arrow_right.png");
            background-size:100% 100%;
        }
    }
</style>