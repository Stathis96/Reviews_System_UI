<template>
  <div class="q-pa-md">
      <h5 class="fonted inset-shadow-down text-italic text-center text-bold">
         All Interns
      </h5>
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
              <q-tab name="employed" class="tableletters" label="Employed Interns" />
              <q-tab name="dismissed" class="tableletters" label="Dismissed Interns" />
              <q-tab name="standby" class="tableletters" label="StandBy Interns" />
            </q-tabs>
            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="active">
                <EmployeeItem
                  :interns="result"
                  :canShowActions="true"
                  @refetchinterviews="handleAllInterns"
                />
              </q-tab-panel>

              <q-tab-panel name="employed">
                <EmployeeItem
                  :interns="result"
                  :canShowActions="true"
                  @refetchinterviews="handleAllInterns"
                />
              </q-tab-panel>

              <q-tab-panel name="dismissed">
                <EmployeeItem
                  :interns="result"
                  :canShowActions="true"
                  @refetchinterviews="handleAllInterns"
                />
              </q-tab-panel>

              <q-tab-panel name="standby">
                <EmployeeItem
                  :interns="result"
                  :canShowActions="true"
                  @refetchinterviews="handleAllInterns"
                />
              </q-tab-panel>

            </q-tab-panels>
          </q-card>
          </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

import { useFetchInterns } from 'src/hooks/useFetchInterns'

import EmployeeItem from '../components/EmployeeItem.vue'

export default defineComponent({
  name: 'AllInterns',
  components: {
    EmployeeItem
  },
  setup () {
    const tab = ref('active')
    const { result, fetchInterns } = useFetchInterns(tab)
    // const { result, fetchInterns } = useFetchInterns('ACTIVE')
    // const { result: employed, fetchInterns: employedInterns } = useFetchInterns('EMPLOYED')
    // const { result: dismissed, fetchInterns: dismissedInterns } = useFetchInterns('DISMISSED')
    // const { result: standby, fetchInterns: standbyInterns } = useFetchInterns('STANDBY')

    const handleAllInterns = async () => { // to use for all emit handling
      await fetchInterns()
      // await employedInterns()
      // await dismissedInterns()
      // await standbyInterns()
    }

    return {
      tab,
      result,
      fetchInterns,
      // employed,
      // employedInterns,
      // dismissed,
      // dismissedInterns,
      // standby,
      // standbyInterns,
      handleAllInterns
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
