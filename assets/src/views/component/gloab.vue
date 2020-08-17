<script >
const debug = 1; //1为开启0为测试
const bw = window.navigator.appName;
var bws=0;
//烽火盒子  1
if (bw.search("FHbw")==0){
    bws = 1;
}
//中兴盒子  2
if (bw.search("ztebw")==0){
    bws = 2;
}
//华为盒子  3
if (bw.search("Netscape")==0){
    bws = 3;
}
//创维盒子  4
if (bw.search("GAIA")==0){
    bws = 4;
}
// AMT Broswer
if (bw.search("AMT")==0&&bw.search("Broswer")==4){
    bws = 7;
}
//天邑盒子  5
if (bw.search("AMT")==0&&bw.search("Broswer")==-1){
    bws = 5;
}
//linux 华为 6
if (bw.search("PILOT")==0){
    bws = 6;
}

const userId="29061797089";//华为测试盒子
// const userId="123";//pc
// const userId="29051319360" //测试中兴盒子
// const userId="29055286724" //正式华为
// const userId="sxdx001";//3.0正式
export default {
  debug,
  bws,
  userId
};
</script>