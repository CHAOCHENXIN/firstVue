import {GETADDRESS,GETAUTOLOGIN,SETUSER,SETMYTOKEN,INDEXCATEGORY,SHOPSINFORM,GETLOGININFORMATION,GETMYTOKEN,GETLOGININPWD} from './mutation_types'
import $http from '../api'

const OK = 0
export default {
  async getAddress(store) {
    const body = await $http.geohash.getGeohash({
      "latitude": store.state.latitude,
      "longitude": store.state.longitude
    })
    if (body.code === OK) {
      store.commit(GETADDRESS,body.data)
    }
  },
  async getIndexCategory(store) {
    const body = await $http.category.getCategory()
    if (body.code === OK) {
      store.commit(INDEXCATEGORY,body.data)
    }
  },
  async getShopsInform(store) {
    const body = await $http.shops.getShops({
      "latitude": store.state.latitude,
      "longitude": store.state.longitude
    })
    
    if (body.code === OK) {
      store.commit(SHOPSINFORM,body.data)
    }
  },
  async getLoginInformation(store,phone,code) {
    const body = await $http.loginSms.getLoginSms({
      phone,
      code
    })
    if (body.code === OK) {
      store.commit(GETLOGININFORMATION,body.data)
    }
  },
  async getLoginInPwd(store,name,pwd,captcha) {
    const body = await $http.loginSms.getLoginSms({
      name,
      pwd,
      captcha
    })
    if (body.code === OK) {
      store.commit(GETLOGININPWD,body.data)
    }
  },
  async getautoLogin(store) {
    const body = await $http.getToken.getTokenFun()
    if (body.code === OK) {
      store.commit(GETAUTOLOGIN,body.data)
    }
  },
  async getMyToken(store,myToken) {
    store.commit(GETMYTOKEN,myToken)
  },
  async setMyToken(store) {
    await store.commit(SETMYTOKEN,'')
  },
  async setUser(store) {
    await store.commit(SETUSER,'')
  },
}