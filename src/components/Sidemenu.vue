<template>
  <div class="sidebar">
    <el-menu :default-active="defaultActive" class="sidebar-content" >
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
    .el-menu
      margin-top:30px
      background: #292929
      .el-menu-item
        color: #cbcbcb
        border-left: 0px solid #292929
      .el-submenu__title
        color: #cbcbcb
        border-left: 0px solid #292929
        .el-menu-item-group__title
          color: #cbcbcb
  .el-menu-item:hover,.el-submenu__title:hover,el-menu-item-group:hover
    background: rgba(0, 0, 0, 0.1)
    color: red
  .el-menu-item.active,.el-submenu__title:active,el-menu-item-group:active
    border-left: 3px solid #ed4040
    color: #fff
    font-weight: 500;

</style>
