<template>
  <div class="search-bar searchBtn" @click="search">
      <div class="btn-wrap">
        <v-button type="primary" :loading="loading" >{{text}}</v-button>
      </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .search-bar
    &.searchBtn
      padding-left : 75px
</style>
<script type="text/ecmascript-6">
  import { Button } from 'element-ui'
  export default {
    data () {
      return {
      }
    },
    props: {
      text: String,
      loading: Boolean
    },
    methods: {
      search () {
        this.$emit('search')
      }
    },
    components: {
      vButton: Button
    }
  }
</script>
