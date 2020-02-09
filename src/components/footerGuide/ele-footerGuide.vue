<template>
  <footer class="footer_guide border-1px">
    <a href="javascript:;" class="guide_item" :class="{on: $route.path === '/msite'}" @click="goto(`/msite`)">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on: $route.path === '/search'}" @click="goto(`/search`)">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on: $route.path === '/order'}" @click="goto(`/order`)">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on: $route.path === '/profile'}" @click="goto(`/profile`)">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </a>
  </footer>
</template>

<script>
  export default {
    name: 'footerGuide',
    methods: {
      goto(path){
        this.$router.replace(path)
      }
    },
  }
</script>

<style scoped lang="stylus">
  @import "../../stylus/mixins.styl"
</style>