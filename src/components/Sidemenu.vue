<template>
  <div class="sidebar">
    <div class="logo-name">智能分析平台</div>
    <el-menu :default-active="defaultActive" class="sidebar-content" theme="dark">
      <el-menu-item index="/">
        <i class="fa fa-life-buoy"></i>
        <span slot="title">返回类型监控</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="fa fa-sun-o"></i>
        <span slot="title" >系统监控</span>
      </el-menu-item>
      <el-menu-item-group title="优惠券券池监控">
        <el-menu-item index="/"><i class="fa fa-gears"></i>券池监控</el-menu-item>
        <el-menu-item index="/"><i class="fa fa-gavel"></i>优惠券领用数据</el-menu-item>
      </el-menu-item-group>
    </el-menu>
    </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        defaultActive: '/'
      }
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  .sidebar
    background: #292929
    width: 220px
    flex: 0 0 220px
    min-height: 100vh
</style>
