<template>
  <div class="search-bar radio-cpt">
    <span class="bar-name">{{opt.name}}</span>
    <div class="switch-wrap">
      <el-switch
          v-model="formData[opt['key']]"
          :on-text="opt.on"
          :off-text="opt.off">
      </el-switch>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .search-bar
    .switch-wrap
      display : inline-block
      min-width : 200px
      line-height :30px
</style>
<script type="text/ecmascript-6">
  import { Radio } from 'element-ui'

  export default {
    name: 'vRadio',
    data () {
      return {
      }
    },
    props: {
      opt: Object,
      formData: Object
    },
    components: {
      elRadio: Radio
    }
  }
</script>
