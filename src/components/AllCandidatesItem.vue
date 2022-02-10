<template>
<div class="q-pa-md bg-light-blue-9">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      v-model:pagination="pagination"
      @request="onRequest"
      dark
    >

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
    </q-table>
  </div>
   <AddCandidateDialog ref="AddCandidateDialogRef" @refetchupdatedcandidates="refetchcandidates"/>
   <DeleteDialog ref="deleteDialogRef"
    :willDeleteCandidate="true"
    :typeOfProp="'Candidate'"
    @refetchupdatedcandidates="refetchcandidates"/>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'

import AddCandidateDialog from '../components/AddCandidateDialog.vue'
import DeleteDialog from '../components/DeleteDialog.vue'
import PaginationInputData from 'src/interfaces/classes/PaginationInputData'
import Candidate from 'src/interfaces/Candidate'

export default defineComponent({
  name: 'InterviewItem',
  emits: ['refetchcandidates', 'fetchingPaginatedData'],
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
    // sksks
    const pagination = computed(() => {
      return props.propPagination
    })
    const filter = ref('')
    // const pagination = ref(
    //   props.propPagination ? props.propPagination : { page: 1, limit: 10 })

    // const pagination = ref({
    //   page: 1,
    //   rowsPerPage: 5,
    //   rowsNumber: 20
    // })

    // console.log('props pagination IS THIS', props.propPagination)

    // watch(props.propPagination, () => {
    //   console.log('mpainei pote?')
    //   console.log('props pagination : ', props.propPagination)

    //   if (props.propPagination.page !== 0) {
    //     console.log('mpainei pote mesa sto if?')
    //     pagination.value.page = props.propPagination.page
    //     pagination.value.rowsPerPage = props.propPagination.limit
    //   }
    // })

    // watch(() => props.propPagination, () => {
    //   console.log('mpainei pote?')
    //   if (props.propPagination !== undefined) {
    //     console.log('from inside watcher', props.propPagination)
    //     pagination.value.page = props.propPagination.page
    //     pagination.value.rowsPerPage = props.propPagination.limit
    //     console.log('pagination page', pagination.value.page)
    //     console.log('pagination rowsPerPage', pagination.value.rowsPerPage)
    //     // pagination.value.rowsNumber = props.propPagination.
    //   }
    // })

    const onRequest = (payload: { pagination: { page: number, rowsPerPage: number}, filter: string }) => {
      // console.log('payload is ', payload)
      // console.log('filter is ', filter)
      emit('fetchingPaginatedData', payload.pagination.page, payload.pagination.rowsPerPage, filter)
    }

    const AddCandidateDialogRef = ref(null)
    const deleteDialogRef = ref(null)

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
      pagination,
      onRequest,
      filter
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
