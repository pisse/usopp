<template>
  <div class="search-bar radio-cpt">
    <span class="bar-name">{{opt.name}}</span>
    <div class="radio-wrap">
      <el-radio  size="tiny" v-for="(item,idx) in opt.items" :key="idx" class="radio" v-model="formData[opt['key']]" :label="item.val">{{item.label}}</el-radio>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .search-bar
    .radio-wrap
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
