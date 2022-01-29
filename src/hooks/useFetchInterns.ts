import { ref, onMounted, Ref, unref, watch } from 'vue'
import { print } from 'graphql'

import { api } from 'src/boot/axios'

import { GraphQLResponse } from 'src/interfaces/AxiosResponse'
import { findPercentageOfInterns, findPercentageOfInternsMonthly, getActiveInterns, getOtherInterns, getSingleIntern } from 'src/gql/Intern/InternQueries'

import Intern from 'src/interfaces/Intern'
import Stats from 'src/interfaces/Stats'

export function useFetchInterns (status: Ref<string>) {
  const result = ref<Intern[]>([])
  const loading = ref(false)

  const fetchInterns = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(getActiveInterns),
          variables: {
            getInternsByStatus: unref(status)
          }
        }
      }) as unknown as GraphQLResponse <{ activeInterns: Intern[]}>

      if (response.data.data) {
        // console.log(response.data.data.activeInterns)
        result.value = response.data.data.activeInterns
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(async () => {
    await fetchInterns().catch(e => console.log(e))
  })
  watch(status, async () => {
    // console.log('watcher')
    // console.log('val:', val)
    // console.log('prev', prev)
    await fetchInterns()
  })

  return {
    result,
    loading,
    fetchInterns
  }
}

export function useFetchOtherInterns () {
  const otherResult = ref<Intern[]>([])
  const loading = ref(false)

  const fetchOtherInterns = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(getOtherInterns)
        }
      }) as unknown as GraphQLResponse <{ otherInterns: Intern[]}>

      if (response.data.data) {
        // console.log(response.data.data.activeInterns)
        otherResult.value = response.data.data.otherInterns
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(async () => {
    await fetchOtherInterns().catch(e => console.log(e))
  })

  return {
    otherResult,
    loading,
    fetchOtherInterns
  }
}

export function useFetchInternById (id: string) {
  const result = ref<Intern>()
  const loading = ref(false)

  const fetchIntern = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(getSingleIntern),
          variables: {
            getInternById: id
          }
        }
      }) as unknown as GraphQLResponse <{ singleIntern: Intern}>

      if (response.data.data) {
        // console.log(response.data.data.activeInterns)
        result.value = response.data.data.singleIntern
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(async () => {
    await fetchIntern().catch(e => console.log(e))
  })

  return {
    result,
    loading,
    fetchIntern
  }
}

export function useFetchStatsForInterns () {
  const internsResult = ref<Stats[]>([])
  const loading = ref(false)

  const fetchStats = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(findPercentageOfInterns)
        }
      }) as unknown as GraphQLResponse <{ internsStats: Stats[]}>

      if (response.data.data) {
        // console.log(response.data.data.activeInterns)
        internsResult.value = response.data.data.internsStats
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
    internsResult,
    loading,
    fetchStats
  }
}

export function useFetchStatsForInternsPerPeriod (months: Ref<number>) {
  const internsPeriodResult = ref<Stats[]>([])
  const loading = ref(false)

  // watch(months,
  //   (months) => {
  //     console.log('from inside usefetchinterns months value changed to : ', months)
  //   })
  // const month = unref(months)

  console.log('MONTH SENT to interns', months.value)
  const fetchStats = async () => {
    console.log('month', months.value)
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(findPercentageOfInternsMonthly),
          variables: {
            findPercentageOfInternsMonthly: unref(months)
          }
        }
      }) as unknown as GraphQLResponse <{ internsPeriodStats: Stats[]}>

      if (response.data.data) {
        // console.log(response.data.data.activeInterns)
        internsPeriodResult.value = response.data.data.internsPeriodStats
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
    internsPeriodResult,
    loading,
    fetchStats
  }
}
