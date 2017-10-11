<template>
  <div class="wrapper">
    <v-header></v-header>
    <div class="content">
      <side-menu></side-menu>
      <transition name="fadeIn">
        <div class="content-wrapper">
          <router-view></router-view>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import header from 'components/Header'
  import sideMenu from 'components/Sidemenu'

  Vue.use(ElementUI)
  export default {
    data () {
      return {

      }
    },
    methods: {

    },
    components: {
      vHeader: header, sideMenu
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .wrapper
    width: 100%
    overflow:hidden
    .content
      display: flex
      display: -webkit-flex
    .content-wrapper
      flex: 1
      overflow : hidden
      padding: 0 0 25px 0
      background: #edf1f5


  .fadeIn-enter-active, .fadeIn-leave-active
    transition: opacity .5s

  .fadeIn-enter, .fadeIn-leave-to
    opacity: 0

</style>

