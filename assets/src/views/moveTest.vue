<!-- 移动 -->
<template>
    <div class="move">
        <div class="moveTest">
            <div class="smallBox" 
                ref="kongtiao"
                @mousedown="mouseDownHandle($event)"
                @mouseup="mouseUpHandle($event)"
            >
                点我拖拽盒子
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            moveDataelse: {
                x: null,
                y: null
            }
        };
    },

    components: {},

    computed: {},

    mounted(){},

    methods: {

        mouseDownHandle(event) {
            this.moveDataelse.x = event.pageX - this.$refs.kongtiao.offsetLeft
            this.moveDataelse.y = event.pageY - this.$refs.kongtiao.offsetTop
            event.currentTarget.style.cursor = 'move'
            window.onmousemove = this.mouseMoveHandleelse
        },
        mouseMoveHandleelse (event) {
            let moveLeftNum = event.pageX - this.moveDataelse.x
            let moveTopNum = event.pageY - this.moveDataelse.y
            // if(moveLeftNum>=0){
            //     let moveLeft = moveLeftNum + 'px'
            // }else{
            //     let moveLeft = 0 + 'px' 
            // }
            // if(moveTopNum>=0){
            //     let moveTop = moveTopNum + 'px'
            // }else{
            //     let moveTop = 0 + 'px'
            // }
            let moveLeft = event.pageX - this.moveDataelse.x + 'px'
            let moveTop = event.pageY - this.moveDataelse.y + 'px'
            console.log("top:"+moveTop,"left:"+moveLeft);
            this.$refs.kongtiao.style.left = moveLeft
            this.$refs.kongtiao.style.top = moveTop
        },
        mouseUpHandle (event) {
            window.onmousemove = null
            event.currentTarget.style.cursor = 'move'
            console.log('鼠标松开了');
        }
    }
}

</script>
<style lang='less' scoped>
    .move{
        width: 100%;
        height: 100vh;
        .moveTest{
            width: 48rem;
            height: 27rem;
            background-color: aqua;
            margin-left: 25%;
            margin-top: 13rem;
            position: relative;
            .smallBox{
                width: 12rem;
                height:7rem;
                background-color: red;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }
    
</style>