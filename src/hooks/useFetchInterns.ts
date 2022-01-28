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
