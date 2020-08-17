let storage={
    set(key,value){
        localStorage.setItem(key, JSON.stringify(value))
    },
    get(key){
        let str = localStorage.getItem(key)
        return JSON.parse(str);
    },
    del(key){
        localStorage.removeItem(key);
    }
}
export default storage