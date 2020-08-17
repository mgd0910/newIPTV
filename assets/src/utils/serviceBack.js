import storage from "./localStorage"
import cut from "./cut"

let serviceBack={
    serviceBack(){
        if (cut.GetQueryValue(this.backurls, "fromLaunch")) {
            Utility.setValueByName("exitIptvApp");
        }else {
            if(cut.GetQueryValue(this.backurls, "backUrl")){
                this.backurl = cut.GetQueryValue(this.backurls, "backUrl")
            }else if(cut.GetQueryValue(this.backurl, "backurl")){
                this.backurl = cut.GetQueryValue(this.backurls, "backurl")
            }else if(storage.get("backurl").indexOf("vas_to_epg") > -1){
                let reg = /[^><]+(?=<\/page_url>)/gim;
                let text = storage.get("backurl");
                let str = text.replace(/%2F/g, "/");
                let url = str.replace(/%3A/g, ":");
                let urls = url.match(reg)[0];
                this.backurl = urls + "?vas_info=%3Cvas_action%3Eback%3C/vas_action%3E";
            }
            window.location.href = this.backurl;
        }
    }
}
export default serviceBack