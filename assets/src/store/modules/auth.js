import {MOBILE} from '../mutations'
const Auth={
    state:{
           mobile:15191791190,
           password:''
    },
    mutations:{
        [MOBILE](state,value){
           state.mobile=value
           
        }
    }
}
export default Auth