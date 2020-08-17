let clientWidth={
    clientWidth(bws){
        var clientWidth = document.documentElement.clientWidth;
        switch (bws) {
        case 1: //烽火
            document
            .getElementsByTagName("html")[0]
            .setAttribute(
                "style",
                "font-size: " + clientWidth / 21.49 + "px !important;"
            );
            break;
        case 2: //中兴
            document
            .getElementsByTagName("html")[0]
            .setAttribute(
                "style",
                "font-size: " + clientWidth / 17.09 + "px !important;"
            );
            break;
        case 3: //华为
            document
            .getElementsByTagName("html")[0]
            .setAttribute(
                "style",
                "font-size: " + clientWidth / 96.45 + "px !important;"//19.29*10/2
            );
            break;
        case 6: //linux 华为
            document
            .getElementsByTagName("html")[0]
            .setAttribute(
                "style",
                "font-size: " + clientWidth / 19.29 + "px !important;"
            );
            break;
        default:
            //默认
            document
            .getElementsByTagName("html")[0]
            .setAttribute(
                "style",
                "font-size: " + clientWidth / 96.45 + "px !important;"
            );
            break;
        }
    }
}
export default clientWidth