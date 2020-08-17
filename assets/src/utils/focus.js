let time;
let times;
let times1;
let contentTime;
let horse={
    horse(i,v){
        let distance;
        let videoBox = document.getElementsByClassName("videoBox")[i]
        if(videoBox.classList.contains('focus')==true){
            let titleBox = videoBox.getElementsByClassName("titleBox")[0];
            let title = titleBox.getElementsByClassName("title")[0];
            if(titleBox.offsetWidth<title.offsetWidth){
                distance = title.offsetWidth - titleBox.offsetWidth
                let left = 0;//每次移动的距离
                time=setInterval(() => {
                    // 一、数据修改
                    // 1.计算数据
                    left+=2;
                    // 2.边界判断
                    if(left>=distance+30){
                        left = 0
                    }
                    // 二、修改外观
                    title.style.left=-left+"px"
                }, 50);
            }
            
        }else{
            return
        }
    },
    blurHorse(i,v){
        clearInterval(time);
        let videoBox = document.getElementsByClassName("videoBox")[i]
        let titleBox = videoBox.getElementsByClassName("titleBox")[0];
        let title = titleBox.getElementsByClassName("title")[0];
        title.style.left=0+"px";
    },
    relatedHorse(i,v){
        let related = document.getElementsByClassName("related")[i];
        if(related.classList.contains('focus')==true){
            let relatedTitle = related.getElementsByClassName("relatedTitle")[0];
            if(relatedTitle.offsetWidth>related.offsetWidth){
                let distance = relatedTitle.offsetWidth - related.offsetWidth
                let left = 0;//每次移动的距离
                times=setInterval(() => {
                    // 一、数据修改
                    // 1.计算数据
                    left+=2;
                    // 2.边界判断
                    if(left>=distance+40){
                        left = 0
                    }

                    // 二、修改外观
                    relatedTitle.style.left=-left+"px"
                }, 50);
            }
            
        }
    },   
    relatedBlur(i,v){
        clearInterval(times);
        let related = document.getElementsByClassName("related")[i];
        let relatedTitle = related.getElementsByClassName("relatedTitle")[0];
        relatedTitle.style.left=0+"px"
    },
    recomHorse(i,v){
        let recommend = document.getElementsByClassName("recommend")[i];
        if(recommend.classList.contains('focus')==true){
            let titBox = recommend.getElementsByClassName("titBox")[0];
            let titBoxTitle = titBox.getElementsByClassName("titBoxTitle")[0];
            if(titBoxTitle.offsetWidth>titBox.offsetWidth){
                let distance = titBoxTitle.offsetWidth - titBox.offsetWidth
                let left = 0;//每次移动的距离
                times1=setInterval(() => {
                    // 一、数据修改
                    // 1.计算数据
                    left+=2;
                    // 2.边界判断
                    if(left>=distance+30){
                        left = 0
                    }
                    // 二、修改外观
                    titBoxTitle.style.left=-left+"px"
                }, 50);
            }
            
        }
    },
    recomBlur(i,v){
        clearInterval(times1);
        let recommend = document.getElementsByClassName("recommend")[i];
        let titBox = recommend.getElementsByClassName("titBox")[0];
        let titBoxTitle = titBox.getElementsByClassName("titBoxTitle")[0];
        titBoxTitle.style.left=0+"px"
    },
    contentHorse(i,v){
        let contentList = document.getElementsByClassName("contentList")[i];
        if(contentList.classList.contains('focus')==true){
            let TitBox = contentList.getElementsByClassName("TitBox")[0];
            let TitBoxTitle = TitBox.getElementsByClassName("TitBoxTitle")[0];
            if(TitBoxTitle.offsetWidth>TitBox.offsetWidth){
                let distance = TitBoxTitle.offsetWidth - TitBox.offsetWidth
                let left = 0;//每次移动的距离
                contentTime=setInterval(() => {
                    // 一、数据修改
                    // 1.计算数据
                    left+=2;
                    // 2.边界判断
                    if(left>=distance+30){
                        left = 0
                    }

                    // 二、修改外观
                    TitBoxTitle.style.left=-left+"px"
                }, 50);
            }
            
        }
    },
    contentBlur(i,v){
        clearInterval(contentTime);
        let contentList = document.getElementsByClassName("contentList")[i];
        let TitBox = contentList.getElementsByClassName("TitBox")[0];
        let TitBoxTitle = TitBox.getElementsByClassName("TitBoxTitle")[0];
        TitBoxTitle.style.left=0+"px"
    }
}
export default horse