import msite from "../components/msite/ele-msite.vue"
import order from '../components/order/ele-order.vue'
import profile from '../components/profile/ele-profile.vue'
import search from '../components/search/ele-search.vue'
import login from '../components/login/ele-login.vue'

export default [
    {path:"/msite",component:msite},
    {path:"/order",component:order},
    {path:"/profile",component:profile},
    {path:"/search",component:search},
    {path:"/login",component:login},
    {path:"/",redirect:"/msite"}
]