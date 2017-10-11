/**
 * Created by Administrator on 2017/5/18.
 */
import Vue from 'vue'

var pageMixin = {
  data () {
    return {
      total: 0,
      pageSize: 10,
      currentPage: 0
    }
  },
  methods: {
    $_pageMixin_handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
    },
    $_pageMixin_handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    }
  }
}

export default pageMixin
