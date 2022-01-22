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




    return {
      tab
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
