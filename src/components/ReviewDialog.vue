<template>
    <q-dialog v-model="open">
      <q-layout view="Lhh lpR fff" container class="bg-white" style="height: 620px; width: 500px">
        <q-form
          @submit="submitAdd()"
          @reset="cancelAll()"
          greedy
          >
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title class="text-center">{{ rowId.length > 0 ? 'Edit' : 'Add'}} Review</q-toolbar-title>
            <q-btn flat round dense/>
          </q-toolbar>
        </q-header>

        <q-footer class="bg-black text-white ">
          <q-toolbar inset class="justify-end q-gutter-md">
              <q-btn  v-close-popup color="red" text-color="black" label="Cancel" type="reset" />
              <q-btn color="green-13"  text-color="black" label="Submit"  type="submit"/>
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding class="q-gutter-md flex justify-center">
           <q-input v-model="fullName" hint="Intern's name" disable dense style="width: 310px" />
           <!-- <q-select v-model="createdReviewData.internId" label="Intern's Name" disable
           option-label="singleIntern"
           option-value="singleInternSupervisor"
            style="width: 310px"
            /> -->
             <!-- na perasw san prop apo panw to result.candidate name kai interviewer , na min einai select auta apla inputs isws -->
             <q-input v-model="supervisorName" hint="Supervisor's name" disable dense style="width: 310px"/>
              <div class="row justify-start">
                <q-input class="q-pr-md" type="range" min="1" max="5" label="Intern's initiative" v-model.number="createdReviewData.initiative" style="width : 250px" :rules="[ val => val < 6 && val > 0 || 'Pick range between 1-5' ]"/>
                <q-input class="q-pl-md" type="number" v-model.number="createdReviewData.initiative" style="width :60px" />
              </div>
              <div class="row justify-start">
              <q-input class="q-pr-md" type="range" min="1" max="5" label="Intern's cooperation" v-model.number="createdReviewData.cooperation" style="width : 250px" :rules="[ val => val < 6 && val > 0 || 'Pick range between 1-5' ]"/>
              <q-input class="q-pl-md" type="number" v-model.number="createdReviewData.cooperation" style="width :60px" />
              </div>
              <div class="row justify-start">
              <q-input class="q-pr-md" type="range" min="1" max="5" label="Intern's performance" v-model.number="createdReviewData.performance" style="width : 250px" :rules="[ val => val < 6 && val > 0 || 'Pick range between 1-5' ]"/>
              <q-input class="q-pl-md" type="number" v-model.number="createdReviewData.performance" style="width :60px" />
              </div>
              <div class="row justify-start">
              <q-input class="q-pr-md" type="range" min="1" max="5" label="Intern's consistency" v-model.number="createdReviewData.consistency" style="width : 250px" :rules="[ val => val < 6 && val > 0 || 'Pick range between 1-5' ]"/>
              <q-input class="q-pl-md" type="number" v-model.number="createdReviewData.consistency" style="width :60px" />
              </div>
              <div class="row justify-start">
              <q-input class="q-pr-md" type="range" min="1" max="5" label="Intern's total" v-model.number="createdReviewData.total" style="width : 250px" :rules="[ val => val < 6 && val > 0 || 'Pick range between 1-5' ]"/>
              <q-input class="q-pl-md" type="number" v-model.number="createdReviewData.total" style="width :60px" />
              </div>
          </q-page>
        </q-page-container>
        </q-form>
      </q-layout>
    </q-dialog>
</template>

<script lang='ts'>

import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

import { useFetchCandidates } from 'src/hooks/useFetchCandidates'
import { useReviewMutations, useReviewUpdateMutations } from 'src/hooks/useReviewMutations'

import ReviewInputData from 'src/interfaces/classes/ReviewInputData'
import PaginationInputData from 'src/interfaces/classes/PaginationInputData'

import Intern from 'src/interfaces/Intern'
import Review from 'src/interfaces/Review'

export default defineComponent({
  name: 'AddDialog',
  emits: ['refetchreviews'],
  // emits: ['refetchinterviews', 'refetchinterviews2', 'refetchpendinginterviews'],
  setup (_, { emit }) {
    // skskks
    const open = ref(false)
    const rowId = ref<string>('')
    const fullName = ref<string>('')
    const supervisorName = ref<string>('')

    const openDialog = (intern : Intern) => {
      if (intern) {
        createdReviewData.value.internId = intern.id
        createdReviewData.value.supervisorId = intern.supervisor.id
        fullName.value = intern.fullname
        supervisorName.value = intern.supervisor.name
        // console.log("check intern's fullname", intern.fullname)
        // console.log("check intern's supervisor", intern.supervisor.name)
        // fullName = intern.fullname
        // console.log('value has been assigned', fullName)
        // console.log('checking the data for the dialog when opening', row)
        // createdReviewData.value.internId = row.intern.id
        // createdReviewData.value.initiative = row.initiative
        // createdReviewData.value.cooperation = row.cooperation
        // createdReviewData.value.performance = row.performance
        // createdReviewData.value.consistency = row.consistency
        // createdReviewData.value.total = row.total
        // createdReviewData.value.createdAt = ''
        // console.log('WAS SENT is', row)
        // console.log('let me check the row.id', row.id)
        // rowId.value = row.id
      }
      open.value = true
    }

    const editReview = (review : Review) => {
      if (review) {
        console.log('thats my review', review)
        createdReviewData.value.internId = review.intern.id
        createdReviewData.value.supervisorId = review.supervisor.id
        fullName.value = review.intern.fullname
        supervisorName.value = review.supervisor.name
        // console.log('WAS SENT is', row)
        // console.log('let me check the row.id', row.id)
        createdReviewData.value.initiative = review.initiative
        createdReviewData.value.cooperation = review.cooperation
        createdReviewData.value.performance = review.performance
        createdReviewData.value.consistency = review.consistency
        createdReviewData.value.total = review.total
        rowId.value = review.id
      }
      open.value = true
    }

    const getShortDate = (date: Date) => {
      return `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? '' : '0'}${date.getMonth() + 1}-${date.getDate() > 9 ? '' : '0'}${date.getDate()}`
    }

    const getShortTime = (date: Date) => {
      return `${date.getHours() > 9 ? '' : '0'}${date.getHours()}:${date.getMinutes() > 9 ? '' : '0'}${date.getMinutes()}`
    }

    const currentDate = getShortDate(new Date())
    const currentTime = getShortTime(new Date())

    const getCandidatesData = ref<PaginationInputData>({
      page: 1,
      limit: 0
    })
    const { result } = useFetchCandidates(getCandidatesData)

    const createdReviewData = ref<ReviewInputData>({
      internId: '',
      supervisorId: '',
      initiative: 1,
      cooperation: 1,
      performance: 1,
      consistency: 1,
      total: 1,
      createdAt: currentDate + ' ' + currentTime
    })

    const { createReview } =
    useReviewMutations(createdReviewData.value)

    const { updateReview } =
    useReviewUpdateMutations(createdReviewData.value)
    const $q = useQuasar()

    const submitAdd = () => {
      if (rowId.value === '') {
        createReview().then((res) => {
          if (!res) {
            $q.notify({
              type: 'positive',
              message: 'Successfully created the review.'
            })
            // console.log('rowId', rowId.value)
            // console.log('CREATEDreviewdata from inside submit is ', createdReviewData)
            emit('refetchreviews') // handled in Intern
          } else {
            $q.notify({
              type: 'negative',
              message: res
            })
          }
          cancelAll()
        }).catch((err) => {
          alert(err)
        })
      } else {
        updateReview(rowId.value).then((res) => {
          if (!res) {
            $q.notify({
              type: 'positive',
              message: 'Successfully updated the review.'
            })
            // console.log('rowId is', rowId.value)
            // console.log('UPDATEDdata from inside is ', createdReviewData)
            emit('refetchreviews')
          } else {
            $q.notify({
              type: 'negative',
              message: res
            })
          }
          // emit('refetchinterviews2')
          // emit('refetchpendinginterviews')
          // cancelAll()
          open.value = false
        }).catch((err) => {
          alert(err)
        })
      }
    }
    const cancelAll = () => {
      open.value = false
      createdReviewData.value.internId = ''
      createdReviewData.value.initiative = 1
      createdReviewData.value.cooperation = 1
      createdReviewData.value.consistency = 1
      createdReviewData.value.performance = 1
      createdReviewData.value.total = 1
      // createdReviewData.value.createdAt = ''
    }

    return {
      open,
      openDialog,
      cancelAll,
      pending: ref(true),
      accepted: ref(false),
      rejected: ref(false),
      standby: ref(false),
      createdReviewData,
      submitAdd,
      result,
      rowId,
      createReview,
      fullName,
      supervisorName,
      getShortDate,
      getShortTime,
      editReview,
      getCandidatesData
    }
  }
})

</script>

<style lang="scss" scoped>

</style>
