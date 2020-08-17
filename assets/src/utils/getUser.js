// @ts-nocheck
let getUser = {
    getuser() {
        var userID;
        if (process.env.NODE_ENV == "production"){
            userID = Authentication.CTCGetConfig("UserID");
        } else {
            userID = "123";
        }
        return userID
    }
}
export default getUser
