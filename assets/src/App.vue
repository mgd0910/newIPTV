<template>
  <div id="app">
   
      <router-view :key="$route.fullPath"></router-view>
   
  </div>
</template>
<script>
import clientWidth from './utils/clientWidth.js'

export default {
  name: "App",
  data() {
    return {
      transitionName: "",
      cashViews: ["commtend",]
    };
  },
  beforeCreate() {
    // var clientWidth = document.documentElement.clientWidth;
    // document.getElementsByTagName("html")[0].setAttribute(
    //   "style",
    //   "font-size: " + clientWidth / 19.29 + "px !important;"
    // );
  },
  created() {
    let _this = this;
    clientWidth.clientWidth(_this.GLOBAL.bws);
  },
  mounted() {
    
  },
  methods: {},
  watch: {
    //使用watch 监听$router的变化
    $route(val) {}
  }
};
</script>
<style>

html, body, div, span, applet, object, iframe,h1, h2, h3, h4, h5, h6, p, blockquote, pre,a, abbr, acronym, address, big, cite, code,del, dfn, em, font, img, ins, kbd, q, s, samp,small, strike, strong, sub, sup, tt, var,b, u, i, center,dl, dt, dd, ol, ul, li,fieldset, form, label, legend,table, caption, tbody, tfoot, thead, tr, th, td,input,select,textarea {margin: 0;padding: 0;border: 0;outline: 0;}
html{
  /* font-size: 125%; */
}
body{
  background:#05022B url(../static/images/bg.jpg) no-repeat center top;
}
</style>
