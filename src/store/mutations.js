import {GETADDRESS,GETAUTOLOGIN,SETUSER,SETMYTOKEN,INDEXCATEGORY,SHOPSINFORM,LOGININFORMATION,GETLOGININFORMATION,GETMYTOKEN,GETLOGININPWD} from './mutation_types'

export default {
  [GETADDRESS](state,address) {
    state.address = address
  },
  [INDEXCATEGORY](state,navigation) {
    state.navigation = navigation
  },
  [SHOPSINFORM](state,shopsInform) {
    state.shopsInform = shopsInform
  },
  [LOGININFORMATION](state,shopsInform) {
    state.shopsInform = shopsInform
  },
  [GETLOGININFORMATION](state,shopsInform) {
    state.user = shopsInform
  },
  [GETLOGININPWD](state,shopsInform) {
    state.user = shopsInform
  },
  [GETMYTOKEN](state,shopsInform) {
    state.myToken = shopsInform
  },
  [SETMYTOKEN](state,a) {
    state.myToken = a
  },
  [SETUSER](state,a) {
    state.user = a
  },
  [GETAUTOLOGIN](state,shopsInform) {
    state.user = shopsInform
  },
}