<template>
  <div class="q-pa-md">
      <h5 class="fonted inset-shadow-down text-italic text-center text-bold">
        All Interviews To Review
      </h5>
        <div class="q-gutter-y-md" style="max-width: auto">
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="pending" class="tableletters" label="Pending Interviews" />
              <q-tab name="accepted" class="tableletters" label="Accepted Interviews" />
              <q-tab name="rejected" class="tableletters" label="Rejected Interviews" />
              <q-tab name="standby" class="tableletters" label="StandBy Interviews" />
            </q-tabs>
            <q-separator />

          </q-card>
          </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'

import { useFetchPendingInterviews } from 'src/hooks/useFetchInterviews'

import InterviewItem from '../components/InterviewItem.vue'

export default defineComponent({
  name: 'Interviews',
  components: {
    InterviewItem
  },
  setup () {
    const tab = ref('pending')
    watch(tab, () => {
      console.log('selection value changed to : ', tab.value)
    })

    return {
      tab
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
