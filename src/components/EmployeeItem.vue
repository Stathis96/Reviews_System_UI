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
                  <q-item clickable v-close-popup @click="AddInternDialogRef.openDialog(send.row)" >
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

          <template v-slot:body-cell-internStatus="props">
            <q-td :props="props" @click="changeStatus()">
                <q-chip
                  :color="props.row.internStatus == 'ACTIVE' ? 'green': props.row.internStatus == 'DISMISSED' ? 'red' : props.row.internStatus == 'EMPLOYED' ? 'orange' : 'grey'"
                  text-color="white"
                  dense
                  class="text-weight-bolder"
                  square
                >{{props.row[props.col.name]}}</q-chip>
            </q-td>
          </template>

    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'

import moment from 'moment'

export default defineComponent({
  name: 'EmployeeItem',
  emits: ['refetchinterviews'],
  components: {
  },
  props: {
  },
  setup (props, { emit }) {

    const columns = computed(
      () => {
        const allColumns = [
          {
            name: 'fullname',
            required: true,
            label: 'Fullname',
            align: 'left',
            field: 'fullname',
            sortable: true
          },
          {
            name: 'email',
            label: 'Email',
            align: 'center',
            field: 'email',
            sortable: true
          },
          {
            name: 'dateOfBirth',
            label: 'DateOfBirth',
            align: 'center',
            field: (row: Intern) => {
              const intern = rows.value.find((c) => c.id === row.id)
              const stime = (intern?.dateOfBirth)
              return moment(stime).format('MMMM Do YYYY')
            },
            sortable: true
          },
          { name: 'school', label: 'School', align: 'center', field: 'school', sortable: true },
          {
            name: 'academicYear',
            label: 'AcademicYear',
            align: 'center',
            field: (row: Intern) => {
              const intern = rows.value.find((c) => c.id === row.id)
              const stime = new Date(intern?.academicYear as Date)
              return moment(stime).format('MMMM Do YYYY')
            },
            sortable: true
          },
          {
            name: 'hiredAt',
            label: 'HiredAt',
            align: 'center',
            field: (row: Intern) => {
              const intern = rows.value.find((c) => c.id === row.id)
              const stime = new Date(intern?.hiredAt as Date)
              return moment(stime).format('MMMM Do YYYY')
            },
            sortable: true
          },
          {
            name: 'endInternship',
            label: 'EndInternship',
            align: 'center',
            field: (row: Intern) => {
              const intern = rows.value.find((c) => c.id === row.id)
              const stime = new Date(intern?.endInternship as Date)
              return moment(stime).format('MMMM Do YYYY')
            },
            sortable: true
          },
          { name: 'position', label: 'Position', align: 'center', field: 'position', sortable: true },
          {
            name: 'supervisor',
            required: true,
            label: 'Supervisor',
            align: 'left',
            field: (row: Intern) => {
              const intern = rows.value.find(u => u.id === row.id)
              return intern?.supervisor.name
            },
            sortable: true
          },
          { name: 'internStatus', label: 'InternStatus', align: 'center', field: 'internStatus', sortable: true },
          { name: 'selectActions', align: 'center', label: 'Actions', sortable: true }
          // {
          //   name: 'reviews',
          //   required: true,
          //   label: 'Reviews',
          //   align: 'left',
          //   field: (row : Intern) => {
          //     const rev = rows.value.find(rev => rev.id === row.id)
          //     // console.log('check', rev?.reviews.pop())
          //     return rev?.reviews.length
          //   },
          //   sortable: true
          // }
        ]
        if (showActions.value === false) {
          allColumns.pop()
        }
        return allColumns
      }
    )
    const rows = computed(
      () => {
        return props.interns
      }
    )
    // const y = ref(rows.value.every((interview) => interview.status === 'pending'))
    const showActions = computed(
      () => {
        return props.canShowActions !== undefined ? props.canShowActions : false
      }
    )


    return {
      columns,
      rows

    }
  }
})
</script>

<style lang="scss" scoped>

</style>
