<template>
  <nav class="nav-bar">
    <div class="nav-header" :class="themeColor">
      <div class="navbar-top-left">
        <a href="javascript:void(0)" class="logo">智投平台</a>
      </div>
      <ul class="navbar-links navbar-left">
        <li>
          <a href="javascript:void(0)" class="navbar-toggle"></a>
        </li>
        <li>
          <div class="navbar-search">
            <el-input class="app-search"
                placeholder="please enter search message..."
              icon="search"
              v-model="searchText"
              :on-icon-click="handleSearch">
            </el-input>
          </div>
        </li>
      </ul>
      <ul class="navbar-links navbar-right">
        <li></li>
        <li class="user"><a href="javascript:void(0)">Luoyuting</a></li>
        <li class="fa fa-"></li>
        <li class="toggle" @click="expandSetting">
          <a href="javascript:void(0)"><i class="el-icon-setting"></i></a>
        </li>
      </ul>
      <div class="right-sidebar" :class="slideRight">
        <div class="scroll-right">
          <div class="panel-title" :class="themeColor">OPTION PANEL <a class="close" @click="closeSetting"><i class="fa fa-close"></i></a></div>
          <div class="panel-body">
            <p class="floor-title">theme color option</p>
            <ul class="floor-theme">
              <li v-for="(color,index) in themeColors"><a href="javascript:void(0)" :class="color" @click="changeTheme(color)"></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Header',
    data () {
      return {
        searchText: '',
        themeColors: ['theme-default', 'theme-yellow', 'theme-blue', 'theme-green', 'theme-dark'],
        themeColor: 'theme-default',
        slideRight: ''
      }
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
        .logo
          display: block
          padding-left: 20px
          height: 60px
          line-height: 60px
          font-size: 24px
          color: #fff
          text-decoration: none
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
              background: rgba(255,255,255,.9)
              transition: .5s ease-out
              border-radius: 40px
              font-weight: 600
              width: 180px
              .el-input__inner
                background: transparent
                border: none
      .navbar-right
        float: right
        display: flex
        display: -webkit-flex
        & li
          display: block
          position: relative
          & a
            display: block
            color: #fff
            min-height: 60px
            line-height: 60px
            padding:0 10px
            &:active
             background: rgba(0,0,0,.1)
            &:hover
              text-decoration: none
              background: rgba(0,0,0,.1)

    .right-sidebar
      position: fixed
      top:0
      right:-240px
      width: 240px
      box-shadow: 5px 1px 40px rgba(0,0,0,.1);
      transition: all .5s ease;
      z-index:9999
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
