<template>
  <div class="q-pa-md">
      <h5 class="fonted inset-shadow-down text-italic text-center text-bold">
        Interviews created
      </h5>
      <q-btn color="orange-7" icon-right="exposure_plus_1" title="Click to schedule a new interview" label="New Interview" rounded class="buttons q-ma-md"
      @click="addDialogRef.openDialog() "
      />
        <div class="q-gutter-y-md " style="max-width: auto">
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
              <q-tab name="scheduled" class="tableletters" label="Scheduled Interviews" />
              <q-tab name="old" class="tableletters" label="Old Interviews" />
            </q-tabs>
            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="scheduled">
                <InterviewItem
                  :interviews="result"
                />
              </q-tab-panel>

              <q-tab-panel name="old">
                <InterviewItem
                  :interviews="oldresult"
                />
              </q-tab-panel>

            </q-tab-panels>
          </q-card>
          </div>
  </div>
   <AddDialog ref="addDialogRef" @refetchinterviews="fetchInterviews" @refetchinterviews2="fetchInterviews2" />
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

import { useFetchInterviews, useFetchOldInterviews } from 'src/hooks/useFetchInterviews'

import InterviewItem from '../components/InterviewItem.vue'
import AddDialog from '../components/AddDialog.vue'

export default defineComponent({
  name: 'Interviews',
  components: {
    InterviewItem,
    AddDialog
  },
  setup () {
    const addDialogRef = ref(null)
    const { result, loading, fetchInterviews } = useFetchInterviews()
    const { oldresult, fetchInterviews2 } = useFetchOldInterviews()

    return {
      tab: ref('scheduled'),
      result,
      fetchInterviews,
      oldresult,
      fetchInterviews2,
      loading,
      addDialogRef
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
