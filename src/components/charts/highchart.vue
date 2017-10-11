<template>
  <div :id="chartId"></div>
</template>
<script type='text/ecmascript-6'>
  import $ from 'jquery'
  import Highcharts from 'highcharts'
  import utils from '../../common/js/utils.js'

  export default {
    data () {
      return {
        chart: null,
        id: ''
      }
    },
    props: {
      params: Object,
      htype: String,
      type: String,
      labels: Array,
      lineCgi: String,
      line: String,
      chartId: String,
      headline: String
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
      addLine (data) {
        if (this.chart) {
          this.chart.addSeries(data)
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
        for (let [index, elem] of showData.entries()) {
          for (let key in elem) {
            if (key != 's_date' && !sObj[key]) {
              sObj[key] = {
                name: self.getLabel(key),
                data: [],
                type: self.type, // key.indexOf('Avg') > -1 ? 'line' : 'column',
                yAxis: key.indexOf('Avg') > -1 ? 0 : 1
              }
            }
            if (key == 's_date' || key == 'dt') {
              categories.push(elem[key])
            } else {
              sObj[key]['data'].push(parseFloat(elem[key]))
            }
          }
        }
        if (this.line == 'single') {
          data['series'].push(sObj[this.htype])
        } else {
          for (let key in sObj) {
            data['series'].push(sObj[key])
          }
        }
        data['categories'] = categories
        this.drawChart(data, 'line')
      },
      showPie (pieData) {
        let sObj = {
//          name: this.getLabel(this.htype),
          name: this.htype,
          type: 'pie',
          data: []
        }
        for (let key in pieData) {
          sObj['data'].push({
            name: pieData[key]['name'] || pieData[key]['type'],
            y: pieData[key]['num']
          })
        }
        this.drawChart({
          series: [sObj]
        })
      },
      drawChart (data, type) {
        var series = data['series'], categories = data['categories'] || []
        var options = {
          chart: {
            renderTo: this.chartId,
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
          title: {
            text: this.headline
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
          yAxis: [{
            labels: {
              style: {
                color: '#f6505c'
              }
            }
          }, {
            title: {
              enabled: false
            },
            labels: {
              formatter () {
                return utils.formatRate(0, 0, parseFloat(this.value).toFixed(2) * 100)
              },
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
//            formatter: function () {
//              var s
//              $.each(this.points, function () {
//                s += this.series.name + ': ' +
//                  utils.formatRate(0, 0, parseFloat(this.y).toFixed(2) * 100)
//              })
//              return s
//            }
          },
          series: []
        }

        var lChart = new Highcharts.Chart(options)
        /*         this._setCache('lineChart', lChart);
         } */
//        for (var i = 0; i < series.length; i++) {
//          lChart.addSeries(series[i])
//        }
        for (let [index, elem] of series.entries()) {
          lChart.addSeries(elem)
        }
        this.chart = lChart
      },
      getLabel (key) {
        var labels = this.labels, label = key
        for (let [index, elem] of labels.entries()) {
          if (elem['key'] == key) {
            label = elem['name']
            return false
          }
        }
        return label
      }
    },
    created () {
    },
    components: {}
  }
</script>
