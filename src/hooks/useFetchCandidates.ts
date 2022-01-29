import { ref, onMounted, watch, Ref, unref } from 'vue'
import { print } from 'graphql'

import { api } from 'src/boot/axios'

import { GraphQLResponse } from 'src/interfaces/AxiosResponse'
import Candidate from 'src/interfaces/Candidate'
import { getCandidates, getCandidatesByStatus, getUsers } from 'src/gql/Candidate/CandidateQueries'
import User from 'src/interfaces/User'
import PaginationInputData from 'src/interfaces/classes/PaginationInputData'
import PaginatedCandidates from 'src/interfaces/PaginatedCandidates'

export function useFetchCandidates (variables: Ref<PaginationInputData>) {
  const result = ref<Candidate[]>([])
  const loading = ref(false)
  const total = ref<number>(0)

  const fetchCandidates = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(getCandidates),
          variables: {
            // data: variables
            getCandidatesData: {
              page: variables.value.page,
              limit: variables.value.limit,
              filter: variables.value.filter
            }
          }
        }
      }) as unknown as GraphQLResponse <{ allCandidates: PaginatedCandidates}>

      if (response.data.data) {
        // console.log('CHECK THIS OUT', response.data.data.allCandidates.context)
        result.value = response.data.data.allCandidates.context
        total.value = response.data.data.allCandidates.total
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(async () => {
    await fetchCandidates().catch(e => console.log(e))
  })
  watch(variables, async () => {
    // console.log('variables are', variables)
    await fetchCandidates()
  })

  return {
    result,
    loading,
    total,
    fetchCandidates
  }
}

export function useFetchUsers () {
  const result = ref<User[]>([])
  const loading = ref(false)

  const fetchUsers = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(getUsers)
        }
      }) as unknown as GraphQLResponse <{ allUsers: User[]}>

      if (response.data.data) {
        // console.log(response.data.data.allCandidates)
        result.value = response.data.data.allUsers
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(async () => {
    await fetchUsers().catch(e => console.log(e))
  })

  return {
    result,
    loading,
    fetchUsers
  }
}

export function useFetchPendingCandidates (status: Ref<string>) {
  const pendingResult = ref<Candidate[]>([])
  const loading = ref(false)

  const fetchCandidates = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(getCandidatesByStatus),
          variables: {
            getCandidatesByStatus: unref(status)
          }
        }
      }) as unknown as GraphQLResponse <{ statusCandidates: Candidate[]}>

      if (response.data.data) {
        // console.log(response.data.data.pendingInterviews)
        pendingResult.value = response.data.data.statusCandidates
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(async () => {
    await fetchCandidates().catch(e => console.log(e))
  })
  watch(status, async () => {
    // console.log('watcher')
    // console.log('val:', val)
    // console.log('prev', prev)
    await fetchCandidates()
  })

  return {
    pendingResult,
    loading,
    fetchCandidates
  }
}
