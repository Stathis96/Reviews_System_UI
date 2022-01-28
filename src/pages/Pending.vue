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

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="pending">
                <InterviewItem
                  :interviews="pendingResult"
                  :canShowActions="true"
                  @refetchinterviews="handleAllInterviews"
                />
              </q-tab-panel>

              <q-tab-panel name="accepted">
                <InterviewItem
                  :interviews="pendingResult"
                  @refetchinterviews="handleAllInterviews"
                />
              </q-tab-panel>

              <q-tab-panel name="rejected">
                <InterviewItem
                  :interviews="pendingResult"
                  @refetchinterviews="handleAllInterviews"
                />
              </q-tab-panel>

              <q-tab-panel name="standby">
                <InterviewItem
                  :interviews="pendingResult"
                  :canShowActions="true"
                  @refetchinterviews="handleAllInterviews"
                />
              </q-tab-panel>

            </q-tab-panels>
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
    const { pendingResult, fetchInterviews } = useFetchPendingInterviews(tab)
    // const { pendingResult, fetchInterviews } = useFetchPendingInterviews('PENDING')
    // const { pendingResult: accepted, fetchInterviews: acceptedInterviews } = useFetchPendingInterviews('ACCEPTED')
    // const { pendingResult: rejected, fetchInterviews: rejectedInterviews } = useFetchPendingInterviews('REJECTED')
    // const { pendingResult: standby, fetchInterviews: standbyInterviews } = useFetchPendingInterviews('STANDBY')

    const handleAllInterviews = async () => { // to use for all emit handling
      await fetchInterviews()
      // await acceptedInterviews()
      // await rejectedInterviews()
      // await standbyInterviews()
    }

    return {
      tab,
      pendingResult,
      fetchInterviews,
      handleAllInterviews
      // accepted,
      // acceptedInterviews,
      // rejected,
      // rejectedInterviews,
      // standby,
      // standbyInterviews,
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
