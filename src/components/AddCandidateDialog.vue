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
            <q-toolbar-title class="text-center">{{ rowId.length > 0 ? 'Edit' : 'Add'}} Candidate</q-toolbar-title>
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
              <q-input class="q-pt-sm q-pl-md q-pr-md q-pb-sm" filled label="Full Name" v-model="createdCandidateData.name" style="width: 310px" type="text" :rules="[ val => val !== '' || 'Please provide intern`s full name', isValidName ]"/>
              <q-input class="q-pt-sm q-pl-md q-pr-md q-pb-sm" filled label="Email" v-model="createdCandidateData.email" style="width: 310px" type="email" :rules="[ val => val !== '' || 'Please provide a valid email address', isValidEmail ]"/>
              <q-input class="q-pt-sm q-pl-md q-pr-md q-pb-sm" filled label="Mobile" v-model="createdCandidateData.mobile" style="width: 310px"  :rules="[ val => val !== '' || 'Please provide a valid cellphone number', isValidMobile ]"/>
              <q-input class="q-pt-sm q-pl-md q-pr-md q-pb-sm" filled label="Degree" v-model="createdCandidateData.degree" style="width: 310px" :rules="[ val => val !== '' || 'Please provide intern`s degree' ]"/>

            <!-- todo options group -->

            <div class="row justify-center q-pl-sm q-pr-md q-pb-sm " style="width :310px">
              <p class="flex flex-center q-pl-md q-pt-md col-12 text-weight-light">Candidate's Applying Position</p>
              <div class="col-4" v-for="option in posOptions" :key="option.value">
                <q-radio v-model="createdCandidateData.position" :val="option.value" :label="option.label"/>
              </div>
            </div>

      <!-- same as above -->
            <!-- <div class="row justify-center q-pl-sm q-pr-md q-pb-sm " style="width :310px">
              <p class="flex flex-center q-pl-md q-pt-md col-12 text-weight-light">Canidate's Applying Position</p>
              <q-radio class="col-4" v-model="createdCandidateData.position" val="sales" label="Sales" />
              <q-radio class="col-4" v-model="createdCandidateData.position" val="financial" label="Financial" />
              <q-radio class="col-4" v-model="createdCandidateData.position" val="marketing" label="Marketing" />
              <q-radio class="col-4" v-model="createdCandidateData.position" val="dev" label="Developer" />
              <q-radio class="col-4" v-model="createdCandidateData.position" val="network" label="Network" />
              <q-radio class="col-4" v-model="createdCandidateData.position" val="stores" label="Stores" />
            </div> -->

            <div class="row justify-center q-px-xl q-pb-sm " style="width :310px">
              <p class="flex flex-center q-pl-md q-pt-md col-12 text-weight-light">Candidate's Status</p>
              <div class="col-6" v-for="option in statOptions" :key="option.value">
                <q-radio v-model="createdCandidateData.status" :val="option.value" :label="option.label"/>
              </div>
            </div>
<!--
            <div class="row justify-center q-pt-sm q-px-xl q-pb-sm" style="width :310px">
              <p class="flex flex-center q-pl-md q-pt-md col-12 text-weight-light">Canidate's Status</p>
              <q-radio class="col-6" v-model="createdCandidateData.status" val="pending" label="Pending"/>
              <q-radio class="col-6" v-model="createdCandidateData.status" val="accepted" label="Accepted"/>
              <q-radio class="col-6" v-model="createdCandidateData.status" val="rejected" label="Rejected"/>
              <q-radio class="col-6" v-model="createdCandidateData.status" val="standby" label="StandBy"/>
            </div> -->

            <div class="row justify-center q-pl-sm q-pr-md q-pb-sm " style="width :310px">
              <p class="flex flex-center q-pl-md q-pt-md col-12 text-weight-light">Candidate's Employment Type</p>
              <div class="col-4" v-for="option in emplOptions" :key="option.value">
                <q-radio v-model="createdCandidateData.employmentType" :val="option.value" :label="option.label"/>
              </div>
            </div>
<!--
            <div class="row justify-center q-pt-sm q-pl-sm q-pr-md q-pb-sm" style="width :310px">
              <p class="flex flex-center q-pl-md q-pt-md col-12 text-weight-light">Canidate's Employment Type</p>
              <q-radio class="col-4" v-model="createdCandidateData.employmentType" val="fulltime" label="Fulltime"/>
              <q-radio class="col-4" v-model="createdCandidateData.employmentType" val="parttime" label="Parttime"/>
              <q-radio class="col-4" v-model="createdCandidateData.employmentType" val="internship" label="Internship"/>
            </div> -->
          </q-page>
        </q-page-container>
      </q-form>
      </q-layout>
    </q-dialog>
</template>

<script lang='ts'>

import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useCandidateMutations, useCandidateUpdateMutations } from 'src/hooks/useCandidateMutations'
import { positionOptions, statusOptions, employmentOptions } from 'src/assets/GlobalStuff'
import Candidate from 'src/interfaces/Candidate'
import CandidateInputData from '../interfaces/classes/CandidateInputData'

export default defineComponent({
  name: 'AddDialog',
  emits: ['refetchcandidates', 'refetchupdatedcandidates'],
  setup (_, { emit }) {
    // skskks
    const open = ref(false)
    const rowId = ref<string>('')

    const posOptions: { label:string, value:string }[] = positionOptions()
    const statOptions: { label:string, value:string }[] = statusOptions()
    const emplOptions: { label:string, value:string }[] = employmentOptions()
    const openDialog = (row : Candidate) => {
      if (row) {
        createdCandidateData.value.name = row.name
        createdCandidateData.value.email = row.email
        createdCandidateData.value.mobile = row.mobile
        createdCandidateData.value.degree = row.degree
        createdCandidateData.value.position = row.position.toLowerCase()
        createdCandidateData.value.status = row.status.toLowerCase()
        createdCandidateData.value.employmentType = row.employmentType.toLowerCase()
        rowId.value = row.id
      }
      open.value = true
    }

    const createdCandidateData = ref<CandidateInputData>({
      name: '',
      email: '',
      mobile: '',
      degree: '',
      position: 'sales',
      status: 'pending',
      employmentType: 'fulltime'
    })

    const cancelAll = () => {
      open.value = false // kinda useless , working with just the option v-close-popup but whatever
      createdCandidateData.value.name = ''
      createdCandidateData.value.email = ''
      createdCandidateData.value.mobile = ''
      createdCandidateData.value.degree = ''
      createdCandidateData.value.position = 'sales'
      createdCandidateData.value.status = 'pending'
      createdCandidateData.value.employmentType = 'fulltime'
      rowId.value = ''
    }

    const isValidEmail = (val : string) => {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    }

    const isValidName = (val : string) => {
      const candidateName = /^[^0-9]*$/
      return candidateName.test(val) || 'Invalid name,accepting only characters'
    }

    const isValidMobile = (val : string) => {
      const candidateMobile = /^[0-9]*$/
      return candidateMobile.test(val) || 'Invalid name,accepting only numbers'
    }
    return {
      open,
      openDialog,
      cancelAll,
      createdCandidateData,
      createCandidate,
      updateCandidate,
      submitAdd
    }
  }
})

</script>

<style lang="scss" scoped>

</style>
