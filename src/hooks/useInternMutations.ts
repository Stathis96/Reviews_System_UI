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
