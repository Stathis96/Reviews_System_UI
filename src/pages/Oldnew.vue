<template>
  <div class="q-pa-md">
      <h5 class="fonted inset-shadow-down text-italic text-center text-bold">
         Interns
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
              <q-tab name="old" class="tableletters" label="Old Interns" />
            </q-tabs>
            <q-separator />

          </q-card>
          </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useFetchInterns, useFetchOtherInterns } from 'src/hooks/useFetchInterns'

export default defineComponent({
  name: 'Interviews',
  components: {
  },
  setup () {
    const tab = ref('active')

    return {
      tab: ref('active')
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
