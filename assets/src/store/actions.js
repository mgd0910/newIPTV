import * as types from './mutations'
const actions={
    setMobile(context,value){
        context.commit(types.MOBILE,value)
    },
    setPassword(context,value){
        context.commit(types.PASSWORD,value)
    }
}
export default actions