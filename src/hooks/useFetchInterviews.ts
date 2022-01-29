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

export function useFetchPendingInterviews (status: Ref<string>) {
  const pendingResult = ref<Interview[]>([])
  const loading = ref(false)

  const fetchInterviews = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(getInterviewsByStatus),
          variables: {
            getInterviewsByStatus: unref(status)
          }
        }
      }) as unknown as GraphQLResponse <{ pendingInterviews: Interview[]}>

      if (response.data.data) {
        // console.log(response.data.data.pendingInterviews)
        pendingResult.value = response.data.data.pendingInterviews
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(async () => {
    await fetchInterviews().catch(e => console.log(e))
  })

  watch(status, async () => {
    // console.log('watcher')
    // console.log('val:', val)
    // console.log('prev', prev)
    await fetchInterviews()
  })

  return {
    pendingResult,
    loading,
    fetchInterviews
  }
}

export function useFetchStatsForInterviews () {
  const interviewsResult = ref<StatusStats[]>([])
  const loading = ref(false)

  const fetchStats = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(findPercentageOfInterviews)
        }
      }) as unknown as GraphQLResponse <{ interviewsStats: StatusStats[]}>

      if (response.data.data) {
        // console.log(response.data.data.activeInterns)
        interviewsResult.value = response.data.data.interviewsStats
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(async () => {
    await fetchStats().catch(e => console.log(e))
  })

  return {
    interviewsResult,
    loading,
    fetchStats
  }
}

export function useFetchStatsForInterviewsPerPeriod (months: Ref<number>) {
  const interviewsPeriodResult = ref<StatusStats[]>([])
  const loading = ref(false)
  console.log('MONTH SENT to interviews', months.value)
  const fetchStats = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(findPercentageOfInterviewsMonthly),
          variables: {
            findPercentageOfInterviewsMonthly: unref(months)
          }
        }
      }) as unknown as GraphQLResponse <{ interviewsPeriodStats: StatusStats[]}>

      if (response.data.data) {
        // console.log(response.data.data.activeInterns)
        interviewsPeriodResult.value = response.data.data.interviewsPeriodStats
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(async () => {
    await fetchStats().catch(e => console.log(e))
  })
  watch(months, async (val, prev) => {
    console.log('watcher')
    console.log('val:', val)
    console.log('prev', prev)
    await fetchStats()
  })

  return {
    interviewsPeriodResult,
    loading,
    fetchStats
  }
}
