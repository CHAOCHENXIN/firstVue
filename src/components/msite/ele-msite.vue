<template>
<!--首页外卖-->
  <section class="content">
    <div class="on">
      <section class="msite">
        <!--首页头部-->
        <header class="msite_header">
            <span class="header_search">
              <i class="iconfont icon-sousuo"></i>
            </span>
          <span class="header_title">
              <span class="header_title_text ellipsis">{{address.name}}</span>
            </span>
          <span class="header_login">
              <span class="header_login_text" v-show="!token">登录|注册</span>
            </span>
        </header>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categoryArr,index) in categoryArrs" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category,index) in categoryArr" :key="index">
                  <div class="food_container">
                    <img :src=baseImgUrl+category.image_url>
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <div class="shop_container">
            <ul class="shop_list" v-for="shop in shopsInform" :key="shop.id">
              <li class="shop_li border-1px">
                <a>
                  <div class="shop_left">
                    <img class="shop_img" :src=baseImgUrl+shop.image_path>
                  </div>
                  <div class="shop_right">
                    <section class="shop_detail_header">
                      <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                      <Star :size="24" :score="shop.rating"/>
                    </section>
                    <section class="shop_rating_order">
                      <section class="shop_rating_order_left">
                        <div class="star star-24">
                          <span class="star-item"></span>
                        </div>
                        <div class="rating_section">
                          {{shop.rating}}
                        </div>
                        <div class="order_section">
                          月售{{shop.recent_order_num}}单
                        </div>
                      </section>
                      <section class="shop_rating_order_right">
                        <span class="delivery_style delivery_right" v-if="shop.delivery_mode">{{shop.delivery_mode.text}}</span>
                      </section>
                    </section>
                    <section class="shop_distance">
                      <p class="shop_delivery_msg">
                        <span>¥20起送</span>
                        <span class="segmentation">/</span>
                        <span :v-if="shop.piecewise_agent_fee">配送费约{{shop.piecewise_agent_fee.tips}}</span>
                      </p>
                    </section>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import {mapActions,mapState} from 'vuex'
  import Swiper from 'swiper'
  import Star from './Star/Star'
  import _ from 'lodash'
  import 'swiper/css/swiper.min.css'

  const OK = 0
  export default {
    name: 'msite',
    data() {
      return {
        token: localStorage.getItem('ele-token')
      }
    },
    components: {
      Star
    },
    methods: {
      ...mapActions(["getAddress","getIndexCategory","getShopsInform"]),
      getSwiper() {
        this.$nextTick(() => {
          new Swiper ('.swiper-container', {
            loop: true, 
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    },
    computed: {
      ...mapState(["address","navigation","shopsInform","baseImgUrl"]),
      categoryArrs() {
        this.getSwiper()
        return _.chunk(this.navigation,8)
      }
    },
    async created() {
      await this.getShopsInform()
      this.getSwiper()
    },
    async mounted() {
      await this.getAddress()
      this.getIndexCategory()
      
    },
  }
</script>

<style scoped lang="stylus">
  @import "../../stylus/mixins.styl"
    .content  //每个页面的内容
        >div //决定哪个页面显示
            display none
            &.on
                display block
            >section
                &.msite  //首页
                    width 100%
                    .msite_nav
                        bottom-border-1px(#e4e4e4)
                        margin-top 45px
                        height 200px
                        background #fff
                        .swiper-container
                            width 100%
                            height 100%
                            .swiper-wrapper
                                width 100%
                                height 100%
                                .swiper-slide
                                    display flex
                                    justify-content center
                                    align-items flex-start
                                    flex-wrap wrap
                                    .link_to_food
                                        width 25%
                                        .food_container
                                            display block
                                            width 100%
                                            text-align center
                                            padding-bottom 10px
                                            font-size 0
                                            img
                                                display inline-block
                                                width 50px
                                                height 50px
                                        span
                                            display block
                                            width 100%
                                            text-align center
                                            font-size 13px
                                            color #666
                            .swiper-pagination
                                >span.swiper-pagination-bullet-active
                                    background #02a774

</style>