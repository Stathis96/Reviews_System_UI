<template>
<div class="q-pa-md bg-light-blue-9">
    <q-table
      :rows="rows"
      :columns="columns"
      :filter="filter"
      row-key="name"
      dark
      bordered
    >
      <!-- class="bg-light-blue-5" -->
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search" class="bg-light-blue-2" filled >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

        <template v-slot:body-cell-selectActions="send">
          <q-td  class="flex flex-center">
            <q-btn color="primary" icon="settings" >
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="addDialogRef.openDialog(send.row)" >
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="deleteDialogRef.openDialog(send.row.id)">
                    <q-item-section>Delete</q-item-section>
                 </q-item>
                 </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </template>

          <template v-slot:body-cell-status="props">
            <q-td :props="props">
                <q-chip
                  :color="props.row.status == 'ACCEPTED' ? 'green': props.row.status == 'REJECTED' ? 'red' : props.row.status == 'PENDING' ? 'orange' : 'purple'"
                  text-color="white"
                  dense
                  class="text-weight-bolder"
                  square
                >{{props.row[props.col.name]}}</q-chip>
            </q-td>
          </template>

    </q-table>
  </div>
   <AddDialog ref="addDialogRef" @refetchpendinginterviews="refetchinterviews"/>
   <DeleteDialog ref="deleteDialogRef" @refetching="refetchinterviews"/>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import moment from 'moment'

import Interview from '../interfaces/Interview'

import AddDialog from '../components/AddDialog.vue'
import DeleteDialog from '../components/DeleteDialog.vue'

export default defineComponent({
  name: 'InterviewItem',
  emits: ['refetchinterviews'],
  components: {
    AddDialog,
    DeleteDialog
  },
  props: {
    interviews: {
      type: [Object] as PropType<Interview[]>,
      required: true
    },
    canShowActions: {
      type: Boolean,
      required: false
    }
  },
  setup (props, { emit }) {
    // sksks
    const addDialogRef = ref(null)
    const deleteDialogRef = ref(null)
    const filter = ref('')
    // const columns = [
    //   {
    //     name: 'candidate',
    //     required: true,
    //     label: 'Candidate',
    //     align: 'left',
    //     field: (row : Interview) => {
    //       const interview = rows.value.find(c => c.id === row.id)
    //       return interview?.candidate.name
    //     },
    //     sortable: true
    //   },
    //   {
    //     name: 'interviewer',
    //     label: 'Interviewer',
    //     field: (row: Interview) => {
    //       const interview = rows.value.find(c => c.id === row.id)
    //       return interview?.interviewer.name
    //     },
    //     sortable: true
    //   },
    //   { name: 'startTime', label: 'StartTime', field: 'startTime', sortable: true },
    //   { name: 'endTime', label: 'EndTime', field: 'endTime', sortable: true },
    //   { name: 'experience', label: 'Experience', field: 'experience', sortable: true },
    //   { name: 'grading', label: 'Grading', field: 'grading', sortable: true },
    //   { name: 'comments', label: 'Comments', field: 'comments', sortable: true },
    //   { name: 'status', label: 'Status', field: 'status', sortable: true },
    //   { name: 'selectActions', align: 'center', label: 'Actions', sortable: true }
    // ]

    const columns = computed(
      () => {
        const allColumns = [
          {
            name: 'candidate',
            required: true,
            label: 'Candidate',
            align: 'left',
            field: (row : Interview) => {
              const interview = rows.value.find(c => c.id === row.id)
              return interview?.candidate.name
            },
            sortable: true
          },
          {
            name: 'interviewer',
            label: 'Interviewer',
            align: 'center',
            field: (row: Interview) => {
              const interview = rows.value.find(c => c.id === row.id)
              return interview?.interviewer.name
            },
            sortable: true
          },
          {
            name: 'startTime',
            label: 'StartTime',
            align: 'center',
            field: (row: Interview) => {
              const interview = rows.value.find((c) => c.id === row.id)
              const stime = new Date(interview?.startTime as Date)
              return moment(stime).format('MMMM Do YYYY, h:mm')
            },
            sortable: true
          },
          {
            name: 'endTime',
            label: 'EndTime',
            align: 'center',
            field: (row: Interview) => {
              const interview = rows.value.find((c) => c.id === row.id)
              const eTime = new Date(interview?.endTime as Date)
              return moment(eTime).format('MMMM Do YYYY, h:mm')
            },
            sortable: true
          },
          { name: 'comments', label: 'Comments', align: 'center', field: 'comments', sortable: true },
          { name: 'experience', label: 'Experience', align: 'center', field: 'experience', sortable: true },
          { name: 'degree', label: 'Degree', align: 'center', field: 'degree', sortable: true },
          { name: 'grading', label: 'Grading', align: 'center', field: 'grading', sortable: true },
          { name: 'status', label: 'Status', align: 'center', field: 'status', sortable: true },
          { name: 'selectActions', align: 'center', label: 'Actions', sortable: true }
        ]
        // check to render action button or not
        if (showActions.value === false) {
          allColumns.pop()
        }
        return allColumns
      }
    )

    const rows = computed(
      () => {
        // console.log('Length is', props.interviews)
        return props.interviews
      }
    )

    return {
      filter,
      columns,
      rows,
      showActions,
      addDialogRef,
      deleteDialogRef,
      refetchinterviews
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
