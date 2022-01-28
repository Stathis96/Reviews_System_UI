<template>
  <q-dialog v-model="open" >
      <q-card class="my-card bg-grey-2 text-black">
        <q-card-section >
          <div class="text-h6">Are you sure you want to delete this {{$props.typeOfProp}}?</div>
          <div class="text-subtitle2"></div>
         </q-card-section>

      <q-card-actions class="row justify-center">
        <q-btn flat class="bg-blue-grey-2 text-black " @click="cancelAll()">Cancel</q-btn>
        <q-btn flat class="bg-red text-white " icon="delete_forever" @click="submitDelete()">Confirm</q-btn>
      </q-card-actions>
    </q-card>

    </q-dialog>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

import { useInterviewDeleteMutations } from 'src/hooks/useInterviewMutations'
import { useInternDeleteMutations } from 'src/hooks/useInternMutations'
import { useCandidateDeleteMutations } from 'src/hooks/useCandidateMutations'
import { useReviewDeleteMutations } from 'src/hooks/useReviewMutations'

export default defineComponent({
  name: 'DeleteDialog',
  emits: ['refetchpendinginterviews', 'refetchupdatedcandidates', 'refetchreviews', 'refetching'],
  props: {
    typeOfProp: {
      type: String, // intern || candidate || review
      required: false,
      default: 'Interview'
    }
  },

  setup (props, { emit }) {
    // skskks
    const open = ref(false)
    const neededId = ref<string>('')

    const openDialog = (id: string) => {
      console.log('is this the right id?', id)
      open.value = true
      neededId.value = id
      // console.log('CHECK if Neededid is the same as above', neededId.value)
    }

    const cancelAll = () => {
      open.value = false
    }
    

    return {
      open,
      openDialog,
      cancelAll,
      deleteInterview
    }
  }
})

</script>

<style lang="scss" scoped>

</style>
