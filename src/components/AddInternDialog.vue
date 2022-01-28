<template>
    <q-dialog v-model="open">
      <q-layout view="Lhh lpR fff" container class="bg-white" style="height: 850px; width: 500px">
        <q-form
          @submit="submitAdd()"
          @reset="cancelAll()"
          greedy
          >
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title class="text-center">{{ rowId.length > 0 ? 'Edit' : 'Add'}} Intern</q-toolbar-title>
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
          <q-select class="q-pt-sm q-pl-md q-pr-md q-pb-sm" filled  label="Supervisor's Name" style="width: 310px" v-model="createdInternData.supervisorId"
             :options= "result"
             option-label="name"
             option-value="id"
             emit-value
             map-options
             :rules="[ val => val !== '' || 'Please choose an available supervisor' ]"
             />

          <q-input class="q-pt-sm q-pl-md q-pr-md q-pb-sm" filled label="Full Name" v-model="createdInternData.fullname" style="width: 310px" :rules="[ val => val !== '' || 'Please provide intern`s full name', isValidName ]"/>
          <q-input class="q-pt-sm q-pl-md q-pr-md q-pb-sm"
            type="email"
            filled label="Email"
            v-model="createdInternData.email"
            style="width: 310px"
            :rules="[ val => val !== '' || 'Please provide a valid email address', isValidEmail ]"/>
          <q-input class="q-pt-sm q-pl-md q-pr-md q-pb-sm" filled label="School" v-model="createdInternData.school" style="width: 310px" :rules="[ val => val !== '' || 'Please provide intern`s school' ]"/>

          <div class="row justify-center q-pt-sm q-px-xl q-pb-sm" style="width :310px">
            <p class="flex flex-center q-pl-md q-pt-md col-12 text-weight-light">Intern's Status</p>
            <q-radio class="col-6" v-model="createdInternData.internStatus" val="active" label="Active"/>
            <q-radio class="col-6" v-model="createdInternData.internStatus" val="employed" label="Employed"/>
            <q-radio class="col-6" v-model="createdInternData.internStatus" val="dismissed" label="Dismissed"/>
            <q-radio class="col-6" v-model="createdInternData.internStatus" val="standby" label="StandBy"/>
          </div>

          <div class="row justify-center q-pt-sm q-pl-sm q-pr-md q-pb-sm" style="width :310px">
            <p class="flex flex-center q-pl-md q-pt-md col-12 text-weight-light">Intern's Applying Position</p>
            <q-radio class="col-4" v-model="createdInternData.position" val="sales" label="Sales" />
            <q-radio class="col-4" v-model="createdInternData.position" val="financial" label="Financial" />
            <q-radio class="col-4" v-model="createdInternData.position" val="marketing" label="Marketing" />
            <q-radio class="col-4" v-model="createdInternData.position" val="dev" label="Developer" />
            <q-radio class="col-4" v-model="createdInternData.position" val="network" label="Network" />
            <q-radio class="col-4" v-model="createdInternData.position" val="stores" label="Stores" />
          </div>

          <q-input class="q-pt-sm q-pl-md q-pr-md q-pb-sm" filled style="width: 310px" v-model="createdInternData.dateOfBirth" label="Date Of Birth" >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="createdInternData.dateOfBirth" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input class="q-pt-sm q-pl-md q-pr-md q-pb-sm" filled style="width: 310px" v-model="createdInternData.academicYear" label="Year Entered to College">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="createdInternData.academicYear" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input class="q-pt-sm q-pl-md q-pr-md q-pb-sm" filled style="width: 310px" v-model="createdInternData.hiredAt" label="Internship's Starting Date" >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="createdInternData.hiredAt" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input class="q-pt-sm q-pl-md q-pr-md q-pb-sm" filled style="width: 310px" v-model="createdInternData.endInternship" label="Internship's Ending Date">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="createdInternData.endInternship" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
          </q-page>
        </q-page-container>
        </q-form>
      </q-layout>
    </q-dialog>
</template>

<script lang='ts'>

import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

import { useFetchUsers } from 'src/hooks/useFetchCandidates'
import { useInternMutations, useInternUpdateMutations } from 'src/hooks/useInternMutations'

import InternInputData from '../interfaces/classes/InternInputData'
import Intern from 'src/interfaces/Intern'

import moment from 'moment'

export default defineComponent({
  name: 'AddDialog',
  emits: ['refetchinterviews', 'refetchinterviews2', 'refetchpendinginterviews'],
  setup (_, { emit }) {
    // skskks
    const open = ref(false)
    const rowId = ref<string>('')

    const openDialog = (row : Intern) => {
      if (row) {
        // console.log('checking the data for the dialog when opening', row)
        createdInternData.value.fullname = row.fullname
        createdInternData.value.email = row.email
        createdInternData.value.supervisorId = row.supervisor.id
        createdInternData.value.dateOfBirth = moment(row.dateOfBirth.toString()).format('YYYY-MM-DD')
        createdInternData.value.hiredAt = moment(row.hiredAt.toString()).format('YYYY-MM-DD')
        createdInternData.value.academicYear = moment(row.academicYear.toString()).format('YYYY-MM-DD')
        createdInternData.value.endInternship = moment(row.endInternship.toString()).format('YYYY-MM-DD')
        createdInternData.value.position = row.position.toLowerCase()
        createdInternData.value.school = row.school
        createdInternData.value.internStatus = row.internStatus.toLowerCase()
        // console.log('WAS SENT is', row)
        // console.log('let me check the row.id', row.id)
        rowId.value = row.id
      }
      open.value = true
    }

    const { result } = useFetchUsers()

    const createdInternData = ref<InternInputData>({
      fullname: '',
      email: '',
      position: 'sales',
      school: '',
      internStatus: 'active',
      supervisorId: '',
      academicYear: '2016-01-01',
      dateOfBirth: '1990-01-01',
      hiredAt: '2021-06-01',
      endInternship: '2022-01-01'
    })

    const cancelAll = () => {
      open.value = false
      createdInternData.value.fullname = ''
      createdInternData.value.supervisorId = ''
      createdInternData.value.dateOfBirth = '1990-01-01'
      createdInternData.value.hiredAt = '2021-06-01'
      createdInternData.value.academicYear = '2016-01-01'
      createdInternData.value.endInternship = '2022-01-01'
      createdInternData.value.position = 'sales'
      createdInternData.value.school = ''
      createdInternData.value.internStatus = 'active'
      createdInternData.value.email = ''
      rowId.value = ''
    }

    const isValidEmail = (val : string) => {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    }

    const isValidName = (val : string) => {
      const internName = /^[^0-9]*$/
      return internName.test(val) || 'Invalid name,accepting only characters'
    }

    return {
      isValidEmail,
      isValidName,
      open,
      openDialog,
      cancelAll,
      createdInternData
    }
  }
})

</script>

<style lang="scss" scoped>

</style>
