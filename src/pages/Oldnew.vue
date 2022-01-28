<template>
  <div class="q-pa-md">
      <h5 class="fonted inset-shadow-down text-italic text-center text-bold">
         Interns
      </h5>
      <q-btn color="orange-7" icon-right="person_add_alt" title="Click to add a new intern" label="New Intern" rounded class="buttons q-ma-md"
      @click="AddInternDialogRef.openDialog() "
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
              <q-tab name="active" class="tableletters" label="Active Interns" />
              <q-tab name="old" class="tableletters" label="Old Interns" />
            </q-tabs>
            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="active">
                <EmployeeItem
                  :interns="result"
                />
              </q-tab-panel>

              <q-tab-panel name="old">
                <EmployeeItem
                  :interns="otherResult"
                />
              </q-tab-panel>

            </q-tab-panels>
          </q-card>
          </div>
  </div>
   <AddInternDialog ref="AddInternDialogRef" @refetchinterviews="fetchInterns" @refetchinterviews2="fetchOtherInterns" />
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useFetchInterns, useFetchOtherInterns } from 'src/hooks/useFetchInterns'

import EmployeeItem from '../components/EmployeeItem.vue'
import AddInternDialog from '../components/AddInternDialog.vue'

export default defineComponent({
  name: 'Interviews',
  components: {
    EmployeeItem,
    AddInternDialog
  },
  setup () {
    const AddInternDialogRef = ref(null)
    const tab = ref('active')
    const { result, loading, fetchInterns } = useFetchInterns(tab)
    const { otherResult, fetchOtherInterns } = useFetchOtherInterns()

    return {
      tab: ref('active'),
      AddInternDialogRef,
      result,
      loading,
      fetchInterns,
      otherResult,
      fetchOtherInterns
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
