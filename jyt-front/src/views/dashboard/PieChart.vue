<template>
  <div :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import resize from './mixins/resize';

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    showValue: Number,
    showColor: String,
    otherValue: Number
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');

      this.chart.setOption({
        title: {
          text: this.showValue + '%',
          top: '35%',
          left: '43%',
          textAlign: 'center',
          textVerticalAlign: 'middle',
          textStyle: {
            color: '#5C5C5C',
            fontSize: '12'
          }
        },
        series: [
          {
            name: '任务量占比',
            type: 'pie',
            radius: ['90%', '75%'],
            silent: true,
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: this.showValue,
                itemStyle: {
                  color: this.showColor
                }
              },
              {
                value: this.otherValue,
                itemStyle: {
                  color: '#EEF0F9'
                }
              }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      });
    }
  }
};
</script>
