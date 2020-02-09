<template>
  <div id="app">
    <router-view></router-view>
    <v-footerGuide></v-footerGuide>
    <link rel="stylesheet" href="http://at.alicdn.com/t/font_518606_snabom9h9y1wz5mi.css">
  </div>
</template>

<script>
import '../public/css/reset.css'
import '../public/css/swiper.css'
import './stylus/index.css'

import FooterGuide from './components/footerGuide/ele-footerGuide'
import {mapState} from 'vuex'

export default {
  name: 'app',
  components: {
    "v-footerGuide": FooterGuide
  },
  created() {
    if(!localStorage.getItem('ele-token')) {
      this.$router.replace('/login')      
    }
  },
}
</script>

<style scoped lang="stylus">
  
</style>
