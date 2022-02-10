import { ref } from 'vue'
import { print } from 'graphql'

import { api } from 'src/boot/axios'
import { GraphQLResponse } from 'src/interfaces/AxiosResponse'
import { createCandidateMutation, deleteCandidateMutation, updateCandidateMutation } from 'src/gql/Candidate/CandidateMutations'
import CandidateInputData from 'src/interfaces/classes/CandidateInputData'
import Candidate from 'src/interfaces/Candidate'

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
