import { ref, onMounted, Ref, unref, watch } from 'vue'
import { print } from 'graphql'

import { api } from 'src/boot/axios'
import { getOldInterviews, getInterviewsByStatus, getScheduledInterviews, findPercentageOfInterviews, findPercentageOfInterviewsMonthly } from 'src/gql/Interview/InterviewQueries'

import { GraphQLResponse } from 'src/interfaces/AxiosResponse'

import Interview from 'src/interfaces/Interview'
import StatusStats from 'src/interfaces/StatusStats'

export function useFetchInterviews () {
  const result = ref<Interview[]>([])
  const loading = ref(false)

  const fetchInterviews = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(getScheduledInterviews)
        }
      }) as unknown as GraphQLResponse <{ scheduledInterviews: Interview[]}>

      if (response.data.data) {
        console.log(response.data.data.scheduledInterviews)
        result.value = response.data.data.scheduledInterviews
      }
    } catch (e) {
      console.log('from inside hook function')
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(async () => {
    await fetchInterviews().catch(e => console.log(e))
  })

  return {
    result,
    loading,
    fetchInterviews
  }
}

export function useFetchOldInterviews () {
  const oldresult = ref<Interview[]>([])
  const oldloading = ref(false)

  const fetchInterviews2 = async () => {
    try {
      oldloading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(getOldInterviews)
        }
      }) as unknown as GraphQLResponse <{ oldInterviews: Interview[]}>

      if (response.data.data) {
        console.log(response.data.data.oldInterviews)
        oldresult.value = response.data.data.oldInterviews
      }
    } catch (e) {
      console.log(e)
    } finally {
      oldloading.value = false
    }
  }
  onMounted(async () => {
    await fetchInterviews2().catch(e => console.log(e))
  })

  return {
    oldresult,
    oldloading,
    fetchInterviews2
  }
}
