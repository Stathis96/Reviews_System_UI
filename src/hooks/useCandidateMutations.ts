import { ref } from 'vue'
import { print } from 'graphql'

import { api } from 'src/boot/axios'
import { GraphQLResponse } from 'src/interfaces/AxiosResponse'
import { createCandidateMutation, deleteCandidateMutation, updateCandidateMutation } from 'src/gql/Candidate/CandidateMutations'
import CandidateInputData from 'src/interfaces/classes/CandidateInputData'
import Candidate from 'src/interfaces/Candidate'

let errors = ''
export function useCandidateMutations (variables: CandidateInputData) {
  const result = ref<Candidate>()
  const loading = ref(false)

  const createCandidate = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(createCandidateMutation),
          variables: {
            // data: variables
            createCandidateData: {
              name: variables.name,
              email: variables.email,
              mobile: variables.mobile,
              degree: variables.degree,
              position: variables.position,
              status: variables.status,
              employmentType: variables.employmentType
            }
          }
        }
      }) as unknown as GraphQLResponse <{ createCandidate: Candidate}>

      if (response.data.data) {
        result.value = response.data.data.createCandidate
      }
      if (response.data.errors) {
        console.log('show me the errors', (response.data.errors[0] as unknown as Error).message)
        errors = (response.data.errors[0] as unknown as Error).message
        return errors
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  return {
    createCandidate,
    result,
    loading
  }
}

export function useCandidateUpdateMutations (variables: CandidateInputData) {
  const result = ref<Candidate>()
  const loading = ref(false)

  const updateCandidate = async (updateCandidateId: string) => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(updateCandidateMutation),
          variables: {
            // data: variables
            createCandidateData: {
              name: variables.name,
              email: variables.email,
              mobile: variables.mobile,
              degree: variables.degree,
              position: variables.position,
              status: variables.status,
              employmentType: variables.employmentType
            },
            updateCandidateId: updateCandidateId
          }
        }
      }) as unknown as GraphQLResponse <{ updateCandidate: Candidate}>

      if (response.data.data) {
        result.value = response.data.data.updateCandidate
      }
      if (response.data.errors) {
        console.log('show me the errors', (response.data.errors[0] as unknown as Error).message)
        errors = (response.data.errors[0] as unknown as Error).message
        return errors
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  return {
    updateCandidate,
    result,
    loading
  }
}
}
