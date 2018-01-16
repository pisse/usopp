<template>
  <nav class="nav-bar">
    <div class="nav-header" :class="themeColor">
      <div class="navbar-top-left">
        <a href="javascript:void(0)" class="logo">
          <img src="../../static/img/logo.png" alt="" width="60" height="45">
        </a>
      </div>
      <ul class="navbar-links navbar-left">
        <li>
          <div class="navbar-search">
            <el-input
              class="app-search"
              placeholder="please enter message..."
              icon="search"
              v-model="searchText"
              :on-icon-click="handleSearch">
            </el-input>
          </div>
        </li>
      </ul>
      <ul class="navbar-links navbar-right">
        <li class="user"><a href="javascript:void(0)"><i class="fa fa-user-circle-o"></i>{{username}}</a></li>
        <li ><a href="javascript:void(0)" @click="confirm">注销</a></li>
        <li class="toggle" @click="expandSetting">
          <a href="javascript:void(0)"><i class="el-icon-setting"></i></a>
        </li>
      </ul>
      <div class="right-sidebar" :class="slideRight">
        <div class="scroll-right">
          <div class="panel-title" :class="themeColor">OPTION PANEL <a class="close" @click="closeSetting"><i
            class="fa fa-close"></i></a></div>
          <div class="panel-body">
            <p class="floor-title">theme color option</p>
            <ul class="floor-theme">
              <li v-for="(color,index) in themeColors">
                <a href="javascript:void(0)"
                   :class="color"
                   @click="changeTheme(color)">
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script type="text/ecmascript-6">
  import Services from '@/api/services'
  import _request from '../pages/mixin/request.js'
  import {checkLogin, logOut} from '@/api/login'
  const BASE_URL = 'http://zt.hotel.baidu.com'
  const LOGIN_HREF = 'http://ssa.baidu.com/sso/login?ReturnUrl=http://zt.hotel.baidu.com'
  export default {
    name: 'Header',
    data () {
      return {
        username: '',
        searchText: '',
        themeColors: ['theme-default', 'theme-yellow', 'theme-blue', 'theme-green', 'theme-dark'],
        themeColor: 'theme-yellow',
        slideRight: ''
      }
    },
    created () {
      this.checkLogin()
    },
    methods: {
      changeTheme (color) {
        this.themeColor = color
      },
      handleSearch () {
      },
      expandSetting () {
        this.slideRight = 'slideRight'
      },
      closeSetting () {
        this.slideRight = ''
      },
      setWatch () {
        this.$watch('$route.path', (v, o) => {
          this.updateBread(v)
        })
      },
      showSearch () {
        this.isSearchShow = true
      },
      hide () {
        this.isSearchShow = false
      },
      select (paths) {
        this.$router.push('/' + paths.join('/'))
        this.hide()
      },
      confirm () {
        this.$confirm('确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.logout()
        })
      },
      checkLogin () {
        checkLogin({r: Math.random(), BASE_URL}).then((res) => {
          this.username = res.data.data
          if (!res.data.data) {
            this.$alert('登录失效，请重新登录', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                location.href = LOGIN_HREF
              }
            })
          }
        })
      },
      logout () {
        logOut()
      }
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  .nav-bar
    background-color: #f8f8f8
    border-color: #e7e7e7
    .nav-header
      overflow: hidden
      .navbar-top-left
        width: 220px
        float: left
        background: #292929
        height: 60px
        .logo
          display: block
          padding-top: 10px
          width: 100%
          text-decoration: none
          text-align: center
          & img
            display: inline-block
      .navbar-left
        float: left
        & li
          float: left
          padding: 0 14px
          height: 60px
          .navbar-search
            margin-top: 12px
            .app-search
              display: inline-block
              border: none
              font-size: 13px
              color: #4c5667
              padding-left: 20px
              padding-right: 40px
              background: rgba(255, 255, 255, .9)
              transition: .5s ease-out
              border-radius: 40px
              font-weight: 600
              min-width: 220px
              .el-input__inner
                background: transparent
                border: none
      .navbar-right
        float: right
        display: flex
        display: -webkit-flex
        margin-right:20px
    .right-sidebar
      position: fixed
      top: 0
      right: -240px
      width: 240px
      box-shadow: 5px 1px 40px rgba(0, 0, 0, .1);
      transition: all .5s ease;
      z-index: 9999
      background: #fff
      height: 100%
      .scroll-right
        position: relative
        overflow: hidden
        width: auto
        height: 100%
        .panel-title
          height: 60px
          line-height: 60px
          color: #fff
          padding: 0 0 0 20px
          .close
            float: right
            display: blcok
            font-size: 20px
            color: #fff
            &:hover
              color: #333
        .panel-body
          padding: 20px
          background: #fff
          .floor-title
            font-weight: bold
            line-height: 35px
            color: #333
          .floor-theme
            display: block
            & li
              padding: 5px 0
              display: inline-block
              & a
                position: relative
                width: 50px
                height: 50px
                display: inline-block
                margin: 5px

  .navbar-left li, .navbar-right li
    display: block
    position: relative
    & a
      display: block
      color: #fff
      min-height: 60px
      line-height: 60px
      padding: 0 10px
      &:active
        background: rgba(0, 0, 0, .1)
      &:hover
        text-decoration: none
        background: rgba(0, 0, 0, .1)

  .theme-default
    background: #ed4040

  .theme-yellow
    background: #f1c411

  .theme-blue
    background: #5475ed

  .theme-green
    background: #00c292

  .theme-dark
    background: #3d3d3d

  .right-sidebar.slideRight
    width: 240px
    right: 0px
</style>
