<template>
<div class="q-pa-sm ">
    <div class="q-gutter-sm">
      <q-option-group
      v-model.number="selection"
      :options="options"
      color="primary"
      inline
      dense
    />
    <h6 style="text-align:right" class="font">Displaying stats for the past {{selection}} months</h6>
    </div>
<q-separator></q-separator>
      <div class="q-ma-md column">
        <div class="col-6 box q-mt-md q-mb-md">
        <!-- <p style="text-align:right">Displaying stats for the past {{selection}} months</p> -->
          <VChart :option="interns" style="height: 250%"/>
        </div>
        <div class="col-6">
          <h4 class="font">Interns Stats</h4>
        </div>
          <q-separator></q-separator>
        <div class="col-6 box q-mt-md q-mb-md">
          <!-- <p style="text-align:right">Displaying stats for the past {{selection}} months</p> -->
          <VChart :option="interviews" style="height: 250%"/>
        </div>
        <div class="col-6">
          <h4 class="font">Interviews Stats</h4>
        </div>
        <q-separator></q-separator>
    </div>
</div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'

import { useFetchStatsForInternsPerPeriod } from 'src/hooks/useFetchInterns'
import { useFetchStatsForInterviewsPerPeriod } from 'src/hooks/useFetchInterviews'

use([
  CanvasRenderer,
  GridComponent,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

export default defineComponent({
  name: 'Stats',
  components: {
    VChart
  },
  setup () {
    // sksksk
    const selection = ref(120)
    const { internsPeriodResult } = useFetchStatsForInternsPerPeriod(selection)
    const { interviewsPeriodResult } = useFetchStatsForInterviewsPerPeriod(selection)

    // watch(selection, () => {
    //   console.log('selection value changed to : ', selection.value)
    // })
    // const internsPeriodResult = computed(
    //   () => {
    //     console.log('selection value: ', selection.value)
    //     const { internsPeriodResult: internss } = useFetchStatsForInternsPerPeriod(selection)
    //     return internss
    //   })

    // const { internsPeriodResult } = useFetchStatsForInternsPerPeriod(120)
    // const { interviewsPeriodResult } = useFetchStatsForInterviewsPerPeriod(120)
    // const { interviewsPeriodResult: oneMonth } = useFetchStatsForInterviewsPerPeriod(1)
    // const { interviewsPeriodResult: sixMonth } = useFetchStatsForInterviewsPerPeriod(6)
    // const { interviewsPeriodResult: oneYear } = useFetchStatsForInterviewsPerPeriod(12)

    // const interviewsPeriodResult = computed(
    //   () => {
    //     console.log('selection value: ', selection.value)
    //     const { interviewsPeriodResult: interviewss } = useFetchStatsForInterviewsPerPeriod(selection)
    //     return interviewss
    //   })
    // const { internsPeriodResult: forOneMonth } = useFetchStatsForInternsPerPeriod(1)
    // const { internsPeriodResult: forSixMonth } = useFetchStatsForInternsPerPeriod(6)
    // const { internsPeriodResult: forOneYear } = useFetchStatsForInternsPerPeriod(12)

    // const { interviewsPeriodResult: oneMonth } = useFetchStatsForInterviewsPerPeriod(selectedMonth)

    const interns = ref(
      {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Interns',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '15',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: internsPeriodResult
          }
        ]

      })

    const interviews = ref({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Interviews',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '15',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: interviewsPeriodResult
        }
      ]
    })

    return {
      internsPeriodResult,
      interviewsPeriodResult,
      interns,
      interviews,
      selection,
      options: [
        {
          label: 'All Data',
          value: 120
        },
        {
          label: 'Monthly Data',
          value: 1
        },
        {
          label: '6 Months Data',
          value: 6
        },
        {
          label: 'Annual Data',
          value: 12
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.font{
  font-family: 'Bebas Neue', cursive;
}

.box {
  box-shadow:
  0 2px 1.4px rgba(0, 0, 0, 0.034),
  0 6px 4.6px rgba(0, 0, 0, 0.048),
  0 10px 8.5px rgba(0, 0, 0, 0.06);
  align-self: center;
  background: white;
  width: 600px;
  border-radius: 15px;
}

#p6 {background-color:hsla(290,60%,70%,0.3);}
#p5 {background-color:hsla(290,100%,50%,0.3);}
</style>
