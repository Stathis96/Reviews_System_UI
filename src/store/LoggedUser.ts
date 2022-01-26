import { defineStore } from 'pinia'
import { AuthUser } from '../interfaces/AuthUser'

// export const usersStore = defineStore('users', {
//   // arrow function recommended for full type inference
//   state: () => {
//     const id = ''
//     const name = ''
//     const email = ''
//     return {
//       // all these properties will have their type inferred automatically
//       id,
//       name,
//       email
//     }
//   }
// })

export const usersStore = defineStore({
  // arrow function recommended for full type inference
  id: 'users',
  state: () => ({
    user: {} as AuthUser
  }),
  getters: {
    getUser (state) {
      return state.user
    }
  }
})
