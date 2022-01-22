<template>
  <div class="q-pa-md">
      <h5 class="fonted inset-shadow-down text-italic text-center text-bold">
        Candidates already registered
      </h5>
      <q-btn color="orange-7" icon-right="person_add_alt" title="Click To Add A New Candidate" label="New Candidate" rounded class="buttons q-ma-md"
      @click="AddCandidateDialogRef.openDialog() "
      />
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
              <q-tab name="all" class="tableletters" style="" label="All Candidates" />
              <q-tab name="pending" class="tableletters" label="Pending Candidates" />
              <q-tab name="accepted" class="tableletters" label="Accepted Candidates" />
              <q-tab name="rejected" class="tableletters" label="Rejected Candidates" />
              <q-tab name="standby" class="tableletters" label="StandBy Candidates" />
            </q-tabs>
            <q-separator />

          </q-card>
          </div>
  </div>
     <AddCandidateDialog ref="AddCandidateDialogRef" @refetchcandidates="handleAllCandidates" />

</template>

<script lang='ts'>
import { defineComponent, ref, computed, watch } from 'vue'

import { useFetchCandidates, useFetchPendingCandidates } from 'src/hooks/useFetchCandidates'

import CandidateItem from '../components/CandidateItem.vue'
import AllCandidatesItem from '../components/AllCandidatesItem.vue'
import AddCandidateDialog from '../components/AddCandidateDialog.vue'

export default defineComponent({
  name: 'Candidates',
  components: {
    CandidateItem,
    AllCandidatesItem,
    AddCandidateDialog
  },
  setup () {

    const tab = ref('all')


    return {
      tab
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
