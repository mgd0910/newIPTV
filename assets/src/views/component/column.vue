<!-- 微剧组件 -->
<template>
    <div class="columnBox">
        <div class="column" 
            v-for="(v,i) in columnList" 
            :key="i"
            v-items
            @up="columnup(i)"
            @down="columndown(i)"
            @left="columnleft(i)"
            @right="columnright(i)"
            @click="columnClk(i,v.id)"
        >
            <span>文字</span>
        </div>
    </div>
</template>

<script>
export default {
data () {
    return {
    };
},

components: {},

computed: {},

mounted: {},

methods: {}
}

</script>
<style lang='less' scoped>
</style>