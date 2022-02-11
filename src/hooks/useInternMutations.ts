import { ref } from 'vue'
import { print } from 'graphql'

import { api } from 'src/boot/axios'
import { GraphQLResponse } from 'src/interfaces/AxiosResponse'
import { createInternMutation, deleteInternMutation, updateInternMutation } from 'src/gql/Intern/InternMutations'

import Intern from 'src/interfaces/Intern'
import InternInputData from 'src/interfaces/classes/InternInputData'

let errors = ''
export function useInternMutations (variables: InternInputData) {
  const result = ref<Intern>()
  const loading = ref(false)

  const createIntern = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(createInternMutation),
          variables: {
            // data: variables
            createInternData: {
              fullname: variables.fullname,
              supervisorId: variables.supervisorId,
              email: variables.email,
              dateOfBirth: variables.dateOfBirth,
              position: variables.position,
              school: variables.school,
              academicYear: variables.academicYear,
              hiredAt: variables.hiredAt,
              endInternship: variables.endInternship,
              internStatus: variables.internStatus
            }
          }
        }
      }) as unknown as GraphQLResponse <{ createIntern: Intern}>

      if (response.data.data) {
        result.value = response.data.data.createIntern
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
    createIntern,
    result,
    loading
  }
}

export function useInternUpdateMutations (variables: InternInputData) {
  const result = ref<Intern>()
  const loading = ref(false)

  const updateIntern = async (updateInternId: string) => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(updateInternMutation),
          variables: {
            // data: variables
            createInternData: {
              fullname: variables.fullname,
              supervisorId: variables.supervisorId,
              email: variables.email,
              dateOfBirth: variables.dateOfBirth,
              position: variables.position,
              school: variables.school,
              academicYear: variables.academicYear,
              hiredAt: variables.hiredAt,
              endInternship: variables.endInternship,
              internStatus: variables.internStatus
            },
            updateInternId: updateInternId
          }
        }
      }) as unknown as GraphQLResponse <{ updateIntern: Intern}>

      if (response.data.data) {
        result.value = response.data.data.updateIntern
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
    updateIntern,
    result,
    loading
  }
}

export function useInternDeleteMutations () {
  const result = ref<void>()
  const loading = ref(false)

  const deleteIntern = async (id: string) => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(deleteInternMutation),
          variables: {
            // data: variables
            deleteInternId: id
          }
        }
      }) as unknown as GraphQLResponse <{ deleteIntern: void}>

      if (response.data.data) {
        result.value = response.data.data.deleteIntern
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
    deleteIntern,
    result,
    loading
  }
}
