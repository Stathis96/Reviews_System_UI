<template>
    <q-dialog v-model="open">
      <q-layout view="Lhh lpR fff" container class="bg-white" style="height: 800px; width: 500px">
      <q-form
        @submit="submitAdd()"
        @reset="cancelAll()"
        greedy
      >
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title class="text-center">{{ rowId.length > 0 ? 'Edit' : 'Add'}} Interview</q-toolbar-title>
            <q-btn flat round dense/>
          </q-toolbar>
        </q-header>

        <q-footer class="bg-black text-white ">
          <q-toolbar inset class="justify-end q-gutter-md">
              <q-btn class="absolute-left" color="orange-7" dense label="Create New Candidate" @click="AddCandidateDialogRef.openDialog() "/>
              <q-btn  v-close-popup color="red" text-color="black" label="Cancel" type="reset" />
              <q-btn color="green-13"  text-color="black" label="Submit"  type="submit"/>
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding class="q-gutter-md flex justify-center">
             <q-select
                class="q-pt-sm q-pr-md q-pb-sm"
                filled
                label="Candidate's Name"
                style="width: 310px"
                v-model="createdInterviewData.candidateId"
                :options= "result"
                option-label="name"
                option-value="id"
                emit-value
                map-options
                :rules="[ val => val !== '' || 'Please choose an available candidate' ]"
              />

             <!-- <q-select filled  label="Interviewer's Name" style="width: 310px" v-model="createdInterviewData.interviewerId"
             :options= "result"
             option-label="name"
             option-value="id"
             emit-value
             map-options
             /> -->

                <q-input class="q-pt-sm q-pr-md q-pb-sm" filled style="width: 310px" v-model="createdInterviewData.startTime" label="Interview's Starting Time" >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="createdInterviewData.startTime" mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time v-model="createdInterviewData.startTime" mask="YYYY-MM-DD HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input class="q-pt-sm q-pr-md q-pb-sm" filled style="width: 310px" v-model="createdInterviewData.endTime" label="Interview's Ending Time">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="createdInterviewData.endTime" mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time v-model="createdInterviewData.endTime" mask="YYYY-MM-DD HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              <q-input class="q-pt-sm q-pr-md q-pb-sm" filled label="Comments" v-model="createdInterviewData.comments" style="width: 310px"/>
              <div class="row justify-start q-pt-sm q-pl-md q-pr-md q-pb-sm">
                <q-input class="q-pr-md" type="range" min="1" max="5" label="Candidate's experience" v-model.number="createdInterviewData.experience" style="width : 250px" :rules="[ val => val < 6  && val > 0 || 'Pick range between 1-5' ]" />
                <q-input class="q-pl-md" type="number" v-model.number="createdInterviewData.experience" style="width :60px"/>
              </div>
              <div class="row justify-start q-pt-sm q-pl-md q-pr-md q-pb-sm">
              <q-input class="q-pr-md" type="range" min="1" max="5" label="Candidate's degree" v-model.number="createdInterviewData.degree" style="width : 250px" :rules="[ val => val < 6  && val > 0 || 'Pick range between 1-5' ]"/>
              <q-input class="q-pl-md" type="number" v-model.number="createdInterviewData.degree" style="width :60px" />
              </div>
              <div class="row justify-start q-pt-sm q-pl-md q-pr-md q-pb-sm">
              <q-input class="q-pr-md" type="range" min="1" max="10" label="Candidate's grading" v-model.number="createdInterviewData.grading" style="width : 250px" :rules="[ val => val < 11  && val > 0 || 'Pick range between 1-10' ]"/>
              <q-input class="q-pl-md" type="number" v-model.number="createdInterviewData.grading" style="width :60px" />
              </div>
              <div v-if="rowId.length <= 0" class="row justify-center q-pt-sm q-px-xl q-pb-sm" style="width :310px">
                <p class="flex flex-center col-12 text-weight-light">Interview's Status</p>
                <q-checkbox disable class="col-6" v-model="accepted" label="Accepted" />
                <q-checkbox disable class="col-6" v-model="standby" label="StandBy" />
                <q-checkbox disable class="col-6" v-model="rejected" label="Rejected" />
                <q-checkbox disable class="col-6" v-model="pending" label="Pending" />
              </div>
              <div v-else class="row justify-center q-pt-sm q-px-xl q-pb-sm" style="width :310px">
                <p class="flex flex-center col-12 text-weight-light">Interview's Status</p>
                <q-radio class="col-6" v-model="createdInterviewData.status" val="accepted" label="Accepted" />
                <q-radio class="col-6" v-model="createdInterviewData.status" val="standby" label="StandBy" />
                <q-radio class="col-6" v-model="createdInterviewData.status" val="rejected" label="Rejected" />
                <q-radio class="col-6" v-model="createdInterviewData.status" val="pending" label="Pending" />
              </div>
          </q-page>
        </q-page-container>
      </q-form>
      </q-layout>
    </q-dialog>
     <AddCandidateDialog ref="AddCandidateDialogRef" @refetchcandidates="fetchCandidates" />
</template>

<script lang='ts'>

import { defineComponent, ref } from 'vue'

import { useQuasar } from 'quasar'

import { useInterviewMutations, useInterviewUpdateMutations } from 'src/hooks/useInterviewMutations'
import { useFetchCandidates } from 'src/hooks/useFetchCandidates'

import InterviewInputData from '../interfaces/classes/InterviewInputData'
import PaginationInputData from 'src/interfaces/classes/PaginationInputData'
import Interview from 'src/interfaces/Interview'
import AddCandidateDialog from '../components/AddCandidateDialog.vue'
import moment from 'moment'
import { usersStore } from '../store/LoggedUser'

export default defineComponent({
  name: 'AddDialog',
  components: {
    AddCandidateDialog
  },
  // emits: ['refetchinterviews', 'refetchinterviews2', 'refetchpendinginterviews'],
  setup (_, { emit }) {
    const AddCandidateDialogRef = ref(null)
    const store = usersStore()
    const ownerId = store.$state.user.sub
    // skskks
    const $q = useQuasar()
    const open = ref(false)
    const rowId = ref<string>('')

    const openDialog = (row : Interview) => {
      if (row) {
        // console.log('checking the data for the dialog when opening', row)
        createdInterviewData.value.candidateId = row.candidate.id
        // createdInterviewData.value.interviewerId = row.interviewer.id
        createdInterviewData.value.startTime = moment(row.startTime.toString()).format('YYYY-MM-DD HH:mm')
        createdInterviewData.value.endTime = moment(row.endTime.toString()).format('YYYY-MM-DD HH:mm')
        createdInterviewData.value.experience = row.experience
        createdInterviewData.value.degree = row.degree
        createdInterviewData.value.grading = row.grading
        createdInterviewData.value.comments = row.comments
        createdInterviewData.value.status = 'pending'
        // console.log('WAS SENT is', row)
        // console.log('let me check the row.id', row.id)
        rowId.value = row.id
      }
      open.value = true
    }


    const { result, fetchCandidates } = useFetchCandidates(getCandidatesData)

    const createdInterviewData = ref<InterviewInputData>({
      candidateId: '',
      interviewerId: ownerId,
      startTime: '2021-01-01 09:00',
      endTime: '2021-01-01 09:15',
      experience: 1,
      degree: 1,
      grading: 1,
      comments: '',
      status: 'pending'
    })

    const { createInterview } =
    useInterviewMutations(createdInterviewData.value)

    const { updateInterview } =
    useInterviewUpdateMutations(createdInterviewData.value)

    const cancelAll = () => {
      open.value = false
      createdInterviewData.value.candidateId = ''
      // createdInterviewData.value.interviewerId = '111'
      createdInterviewData.value.startTime = '2021-01-01 09:00'
      createdInterviewData.value.endTime = '2021-01-01 09:15'
      createdInterviewData.value.experience = 1
      createdInterviewData.value.degree = 1
      createdInterviewData.value.grading = 1
      createdInterviewData.value.comments = ''
      createdInterviewData.value.status = 'pending'
      rowId.value = ''
    }

    return {
      open,
      openDialog,
      cancelAll,
      pending: ref(true),
      accepted: ref(false),
      rejected: ref(false),
      standby: ref(false),
      createdInterviewData
    }
  }
})

</script>

<style lang="scss" scoped>

</style>
