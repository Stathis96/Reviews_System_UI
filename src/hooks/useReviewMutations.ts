import { ref } from 'vue'
import { print } from 'graphql'

import { api } from 'src/boot/axios'
import { GraphQLResponse } from 'src/interfaces/AxiosResponse'
import Review from 'src/interfaces/Review'
import { createReviewMutation, deleteReviewMutation, updateReviewMutation } from 'src/gql/Review/ReviewMutations'
import ReviewInputData from 'src/interfaces/classes/ReviewInputData'

let errors = ''
export function useReviewMutations (variables: ReviewInputData) {
  const result = ref<Review>()
  const loading = ref(false)

  const createReview = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(createReviewMutation),
          variables: {
            // data: variables
            createReviewData: {
              internId: variables.internId,
              supervisorId: variables.supervisorId,
              createdAt: variables.createdAt,
              initiative: variables.initiative,
              cooperation: variables.cooperation,
              performance: variables.performance,
              consistency: variables.consistency,
              total: variables.total
            }
          }
        }
      }) as unknown as GraphQLResponse <{ createRerview: Review}>

      if (response.data.data) {
        result.value = response.data.data.createRerview
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
    createReview,
    result,
    loading
  }
}

export function useReviewUpdateMutations (variables: ReviewInputData) {
  const result = ref<Review>()
  const loading = ref(false)

  const updateReview = async (updateReviewId: string) => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(updateReviewMutation),
          variables: {
            // data: variables
            createReviewData: {
              internId: variables.internId,
              supervisorId: variables.supervisorId,
              createdAt: variables.createdAt,
              initiative: variables.initiative,
              cooperation: variables.cooperation,
              performance: variables.performance,
              consistency: variables.consistency,
              total: variables.total
            },
            updateReviewId: updateReviewId
          }
        }
      }) as unknown as GraphQLResponse <{ updateReview: Review}>

      if (response.data.data) {
        result.value = response.data.data.updateReview
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
    updateReview,
    result,
    loading
  }
}

