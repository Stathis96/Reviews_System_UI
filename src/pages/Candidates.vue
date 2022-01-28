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

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="all">
                <AllCandidatesItem
                  :candidates="result"
                  :canShowActions="true"
                  :propPagination="pagination"
                  @fetchingPaginatedData ="fetchingPaginatedData"
                  @refetchcandidates="handleAllCandidates"
                />
              </q-tab-panel>

              <q-tab-panel name="pending">
                <CandidateItem
                  :candidates="pending"
                  :canShowActions="true"
                  @refetchcandidates="handleAllCandidates"
                />
              </q-tab-panel>

              <q-tab-panel name="accepted">
                <CandidateItem
                  :candidates="pending"
                  :canShowActions="true"
                  @refetchcandidates="handleAllCandidates"
                />
              </q-tab-panel>

              <q-tab-panel name="rejected">
               <CandidateItem
                  :candidates="pending"
                  :canShowActions="true"
                  @refetchcandidates="handleAllCandidates"
                />
              </q-tab-panel>

              <q-tab-panel name="standby">
                <CandidateItem
                  :candidates="pending"
                  :canShowActions="true"
                  @refetchcandidates="handleAllCandidates"
                />
              </q-tab-panel>

            </q-tab-panels>
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
    const AddCandidateDialogRef = ref(null)

    const pagination = ref({
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 20,
      filter: ''
    })

    const getCandidatesData = computed(() => {
      return {
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
        filter: pagination.value.filter
      }
    })

    const fetchingPaginatedData = (page: number, limit: number, filter: string) => {
      // console.log('im here.', page, limit, 'filter given : ', filter)
      pagination.value.page = page
      pagination.value.rowsPerPage = limit
      pagination.value.filter = filter
    }

    const { result, fetchCandidates, total } = useFetchCandidates(getCandidatesData)
    watch(total, () => {
      pagination.value.rowsNumber = total.value
    })
    const tab = ref('all')
    // watch(tab, () => {
    //   console.log('selection value changed to : ', tab.value)
    // })
    const { pendingResult: pending, fetchCandidates: pendingCandidates } = useFetchPendingCandidates(tab)
    // const { pendingResult: pending, fetchCandidates: pendingCandidates } = useFetchPendingCandidates('PENDING')
    // const { pendingResult: accepted, fetchCandidates: acceptedCandidates } = useFetchPendingCandidates('ACCEPTED') // to do with one call
    // const { pendingResult: rejected, fetchCandidates: rejectedCandidates } = useFetchPendingCandidates('REJECTED')
    // const { pendingResult: standby, fetchCandidates: standbyCandidates } = useFetchPendingCandidates('STANDBY')

    const handleAllCandidates = async () => { // to use for all emit handling
      await fetchCandidates()
      await pendingCandidates()
      // await acceptedCandidates()
      // await rejectedCandidates()
      // await standbyCandidates()
    }

    return {
      tab,
      AddCandidateDialogRef,
      result,
      fetchCandidates,
      total,
      pending,
      pendingCandidates,
      // accepted,
      // acceptedCandidates,
      // rejected,
      // rejectedCandidates,
      // standby,
      // standbyCandidates,
      handleAllCandidates,
      getCandidatesData,
      pagination,
      fetchingPaginatedData
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
