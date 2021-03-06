<template>
<div class="q-pa-md bg-light-blue-9">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
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
                  <q-item clickable v-close-popup @click="AddCandidateDialogRef.openDialog(send.row)" >
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
   <AddCandidateDialog ref="AddCandidateDialogRef" @refetchupdatedcandidates="refetchcandidates"/>
   <DeleteDialog ref="deleteDialogRef"
    :typeOfProp="'Candidate'"
    @refetching="refetchcandidates"/>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'

import AddCandidateDialog from '../components/AddCandidateDialog.vue'
import DeleteDialog from '../components/DeleteDialog.vue'
import Candidate from 'src/interfaces/Candidate'

export default defineComponent({
  name: 'InterviewItem',
  emits: ['refetchcandidates'],
  components: {
    AddCandidateDialog,
    DeleteDialog
  },
  props: {
    candidates: {
      type: [Object] as PropType<Candidate[]>,
      required: true
    },
    canShowActions: {
      type: Boolean,
      required: false
    }
  },
  setup (props, { emit }) {
    // const candidate = 'Candidate'
    const AddCandidateDialogRef = ref(null)
    const deleteDialogRef = ref(null)
    const filter = ref('')
    const columns = computed(
      () => {
        const allColumns = [
          { name: 'name', label: 'Full Name', align: 'left', field: 'name', sortable: true },
          { name: 'email', label: 'Email', align: 'center', field: 'email', sortable: true },
          { name: 'mobile', label: 'Mobile', align: 'center', field: 'mobile', sortable: true },
          { name: 'degree', label: 'Degree', align: 'center', field: 'degree', sortable: true },
          { name: 'position', label: 'Position', align: 'center', field: 'position', sortable: true },
          { name: 'employmentType', label: 'Employment Type', align: 'center', field: 'employmentType', sortable: true },
          {
            name: 'interviews',
            required: true,
            label: 'Interviews Done',
            align: 'center',
            field: (row : Candidate) => {
              const rev = rows.value.find(rev => rev.id === row.id)
              // console.log('check', rev?.reviews.pop())
              return rev?.interviews.length
            },
            sortable: true
          },
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
        return props.candidates
      }
    )

    const showActions = computed(
      () => {
        return props.canShowActions !== undefined ? props.canShowActions : false
      }
    )
    const refetchcandidates = () => {
      emit('refetchcandidates')
    }

    return {
      columns,
      rows,
      showActions,
      AddCandidateDialogRef,
      deleteDialogRef,
      refetchcandidates,
      filter
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
