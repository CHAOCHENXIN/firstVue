<template>
  <!--on表示显示，off表示关闭 登录页面 -->
  <div class="on">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on: wayLog === `sms`}" 
              @click="wayLog = 'sms'">短信登录</a>
            <a href="javascript:;" :class="{on: wayLog === `password`}" 
              @click="wayLog = 'password'">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on: wayLog === `sms`}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model.trim="phoneNumber" 
                  name="phone" v-validate="`required|mobile`">
                <span style="color: red"  v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
                <button :disabled="!ModifyPhoneNumber" class="get_verification"
                :class="{aaaa: ModifyPhoneNumber}" @click.prevent="VerificationCode">
                  {{times>0?times+"秒后重新发送":"获取验证码"}}
                </button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code" name="code" v-validate="{required: true,regex: /^\d{6}$/}" >
                <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on: wayLog === `password`}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名"
                    v-model="name" name="name" v-validate="'required'">
                  <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                </section>
                <section class="login_verification">
                  <input :type="passworldHidden" maxlength="8" placeholder="密码"
                    v-model="pwd" name="pwd" v-validate="'required'">
                  <div class="switch_button" :class="passwordBtn" @click="passwordBtnVal">
                    <div class="switch_circle"></div>
                    <span class="switch_text">...</span>
                  </div>
                  <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码"
                    v-model="captcha" name="captcha" v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}">
                  <img ref="captcha" @click="getCaptcha" class="get_verification" src="http://localhost:4000/captcha" alt="captcha">
                  <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <!-- <a href="javascript:" class="go_back" @click="goto">
          <i class="iconfont icon-jiantou2"></i>
        </a> -->
      </div>
    </section>
  </div>
</template>

<script>
  const OK = 0
  import Vue from 'vue';
  import router from '../../router'
  import { Toast } from 'vant';
  import {mapActions,mapState} from 'vuex';
  export default {
    name: 'search',
    data() {
      return {
        wayLog: 'sms',
        passwordBtn: 'off',
        phoneNumber: '',
        times: 0,
        passworldHidden: 'password',
        code: '',
        name: '',
        pwd: '',
        captcha: '',
        hui: true
      }
    },
    created() {
      if(!localStorage.getItem('ele-token')) {
        this.$router.replace('/login')      
      }
    },
    computed: {
      ...mapState(["user","myToken"]),
      ModifyPhoneNumber: {
        get() {
          return /^1\d{10}$/.test(this.phoneNumber)&&this.hui
        }
      }
    },
    methods: {
      ...mapActions(["getLoginInformation","getMyToken","getLoginInPwd"]),
      getCaptcha(){
        this.$refs.captcha.src = `http://localhost:4000/captcha?time=${new Date()}`
      },
      // goto(){
      //   router.replace("/profile")
      // },
      passwordBtnVal() {
        if(this.passwordBtn === "off") {
          this.passwordBtn = "on"
          this.passworldHidden = 'tel'
        } else {
          this.passwordBtn = "off"
          this.passworldHidden = 'password'
        }
      },
      async VerificationCode() {
        clearInterval(this.tme)
        this.times = 30
        if(this.ModifyPhoneNumber) {
          this.hui = false
          this.tme = setInterval(() => {
            this.times--
            if(this.times === 0)
              this.hui = true
          }, 1000);
        }

        const body = await this.$http.sendcode.getSendcode({
          phone: this.phoneNumber
        })
        if (body.code === OK) {
          Toast.success('消息发送成功');
        } else{
          Toast.fail('消息发送失败')
        }
      },
      async login(){
        if(this.wayLog === "sms") {
          const smsFlag = await this.$validator.validateAll(["phone","code"])
          if(smsFlag) {
            await this.getLoginInformation(this.phoneNumber,this.code)
            await this.getMyToken(this.user.token)
            //token持久化
            localStorage.setItem("ele-token",this.user.token)
            router.replace("/profile")
          }
        } else if(this.wayLog === "password") {
          const passworldFlag = await this.$validator.validateAll(["name","pwd","captcha"])
          if(passworldFlag) {
            await this.getLoginInPwd()
            await this.getMyToken(this.user.token)
            //token持久化
            localStorage.setItem("ele-token",this.user.token)
            router.replace("/profile")
          }
        }    
      }
    },
  }
</script>

<style scoped lang="stylus">
   .aaaa 
    color red !important
</style>