<template>
  <div class="chart_wrap">
      <div ref="chart_content"></div>
  </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>

</style>
<script type='text/ecmascript-6'>
  import $ from 'jquery'
  import Highcharts from 'highcharts'
  import utils from '../../common/js/utils.js'

  export default {
    data () {
      return {
        chart: null
      }
    },
    props: {
      params: Object,
      htype: String,
      type: String,
      labels: Array,
      lineCgi: String,
      line: String
    },
    watch: {
      htype: function () {
        this.getLineData()
      },
      type () {
        if (this.chart && this.chart.series) {
          this.chart.series.forEach((item) => {
            item.remove()
          })
        }
      }
    },
    methods: {
      getLineData () {
        var formData = new FormData()
        formData.append('htype', this.htype)

        for (var key in this.params) {
          formData.append(key, this.params[key])
        }
        this.$http.post(this.lineCgi, formData, {
          credentials: true,
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          res = res.json()
          return res
        }).then((res) => {
          if (this.type == 'pie') {
            this.showPie(res.data)
            this.$emit('pie_data_ready', res.data)
          } else {
            this.showLine(res.data)
          }
        })
      },
      addLine (data, category) {
        if (this.chart) {
          this.chart.addSeries(data)
          this.chart.xAxis[0].setCategories(category)
          this.chart.redraw()
        }
      },
      removeLine (idx) {
        if (this.chart) {
          this.chart.series[idx].remove()
          this.chart.redraw()
        }
      },
      showLine (lineData) {
        var self = this, data = {series: []}, categories = []

        var sObj = {}
        var showData = lineData || []
        $.each(showData, function (i, v) {
          $.each(v, function (key, value) {
            if (key != 's_date' && !sObj[key]) {
              sObj[key] = {
                name: self.getLabel(key),
                data: [],
                type: self.type, // key.indexOf('Avg') > -1 ? 'line' : 'column',
                yAxis: key.indexOf('Avg') > -1 ? 0 : 1
              }
            }

            if (key == 's_date' || key == 'dt') {
              categories.push(value)
            } else {
              sObj[key]['data'].push(parseFloat(value))
            }
          })
        })

        if (this.line == 'single') {
          data['series'].push(sObj[this.htype])
        } else {
          $.each(sObj, function (i, v) {
            data['series'].push(v)
          })
        }
        data['categories'] = categories
        this.drawChart(data, 'line')
      },
      showPie (pieData) {
        let sObj = {
          name: this.getLabel(this.htype),
          type: 'pie',
          data: []
        }
        $.each(pieData, (i, v) => {
          sObj['data'].push({
            name: v['name'],
            y: v['num']
          })
        })
        this.drawChart({
          series: [sObj]
        })
      },
      drawChart (data, type) {
        var series = data['series'], categories = data['categories'] || []
        var options = {
          chart: {
            renderTo: this.$refs.chart_content,
            width: $('.pie_line').width(),
            height: 350,
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            animation: true,
            marginLeft: 80,
            events: {
              drilldown (e) {
                console.log(e)
              }
            }
          },
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            x: 0,
            itemStyle: {
              fontWeight: 'normal',
              color: '#a1a8b4'
            },
            itemHoverStyle: {
              color: '#c9c9c9'
            }
          },
          colors: ['#1c62b8', '#f6505c', '#2bb874', '#19b2b7', '#8673cd', '#f6c928'],
          plotOptions: {
            line: {
              marker: {
                fillColor: '#FFFFFF',
                lineWidth: 2,
                lineColor: null,
                symbol: 'circle'
              }
            },
            pie: {
              allowPointSelect: true,
              size: '80%',
              borderColor: '#d8d5d5',
              dataLabels: {
                enabled: true,
                color: '#606060',
                style: {
                  fontFamily: 'Microsoft Yahei'
                },
                formatter () {
                  // if(this.percentage> 5){
                  // return this.key + (this.y*100).toFixed(2) + '%';
                  return this.key + '  ' + utils.formatRate(0, 0, parseFloat(this.percentage).toFixed(2)) + ''
                  // }
                },
                distance: 10
              }
            }
          },
          credits: {
            enabled: false
          },
          title: false,
          yAxis: [{
            title: {
              enabled: false
            },
            labels: {
              format: '{value}',
              style: {
                color: '#f6505c'
              }
            }
          }, {
            title: {
              enabled: false
            },
            labels: {
              format: '{value}',
              /* formatter: function(){
               return window.G.util.formatInt(0,0,this.value);
               }, */
              style: {
                color: '#f6505c'
              }
            },
            opposite: true
          }],
          xAxis: {
            categories: categories,
            labels: {
              enabled: true
            },
            tickPosition: 'inside',
            tickLength: 4,
            tickmarkPlacement: 'on',
            tickInterval: (categories.length >= 25 ? 5 : 1)

          },
          tooltip: {
            shared: true
          },
          series: []
        }

        // line
        /*   var lChart = this._getCache('lineChart');
         if( !lChart || $.isEmptyObject(lChart) ){ */
        var lChart = new Highcharts.Chart(options)
        /*         this._setCache('lineChart', lChart);
         } */
        for (var i = 0; i < series.length; i++) {
          lChart.addSeries(series[i])
        }
        this.chart = lChart
      },
      getLabel (key) {
        var labels = this.labels, label = key
        $.each(labels, function (i, v) {
          if (v['key'] == key) {
            label = v['name']
            return false
          }
        })
        return label
      }
    },
    created () {
    },
    components: {}
  }
</script>
