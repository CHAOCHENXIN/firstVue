<template>
<!--搜索-->
  <section class="content">
    <div class="on">
      <section class="search">
        <header class="header">
          <a class="header_title">
            <span class="header_title_text">搜索</span>
          </a>
        </header>
        <form class="search_form" action="#">
          <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input">
          <input type="submit" name="submit" class="search_submit">
        </form>
      </section>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'search'
  }
</script>

<style scoped lang="stylus">
  .content  //每个页面的内容
        >div //决定哪个页面显示
            display none
            &.on
                display block
            >section
                &.search  //搜索
                    width 100%
                    .search_form
                        clearFix()
                        margin-top 45px
                        background-color #fff
                        padding 12px 8px
                        input
                            height 35px
                            padding 0 4px
                            border-radius 2px
                            font-weight bold
                            outline none
                            &.search_input
                                float left
                                width 79%
                                border 4px solid #f2f2f2
                                font-size 14px
                                color #333
                                background-color #f2f2f2
                            &.search_submit
                                float right
                                width 18%
                                border 4px solid #02a774
                                font-size 16px
                                color #fff
                                background-color #02a774
</style>