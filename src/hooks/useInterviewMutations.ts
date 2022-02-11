import { ref } from 'vue'
import { print } from 'graphql'

import { api } from 'src/boot/axios'
import { GraphQLResponse } from 'src/interfaces/AxiosResponse'

import Interview from 'src/interfaces/Interview'
import { createInterviewMutation, deleteInterviewMutation, updateInterviewMutation } from 'src/gql/Interview/InterviewMutations'
import InterviewInputData from 'src/interfaces/classes/InterviewInputData'

let errors = ''
export function useInterviewMutations (variables: InterviewInputData) {
  const result = ref<Interview>()
  const loading = ref(false)

  const createInterview = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(createInterviewMutation),
          variables: {
            // data: variables
            createInterviewData: {
              candidateId: variables.candidateId,
              // interviewerId: variables.interviewerId,
              startTime: variables.startTime,
              endTime: variables.endTime,
              experience: variables.experience,
              degree: variables.degree,
              comments: variables.comments,
              grading: variables.grading,
              status: variables.status
            }
          }
        }
      }) as unknown as GraphQLResponse <{ createInterview: Interview}>

      if (response.data.data) {
        result.value = response.data.data.createInterview
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
    createInterview,
    result,
    loading
  }
}

export function useInterviewUpdateMutations (variables: InterviewInputData) {
  const result = ref<Interview>()
  const loading = ref(false)

  const updateInterview = async (updateInterviewId: string) => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(updateInterviewMutation),
          variables: {
            // data: variables
            createInterviewData: {
              candidateId: variables.candidateId,
              // interviewerId: variables.interviewerId,
              startTime: variables.startTime,
              endTime: variables.endTime,
              experience: variables.experience,
              degree: variables.degree,
              comments: variables.comments,
              grading: variables.grading,
              status: variables.status
            },
            updateInterviewId: updateInterviewId
          }
        }
      }) as unknown as GraphQLResponse <{ updateInterview: Interview}>

      if (response.data.data) {
        result.value = response.data.data.updateInterview
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
    updateInterview,
    result,
    loading
  }
}

