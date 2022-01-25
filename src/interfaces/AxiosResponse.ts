import { AxiosResponse } from 'axios'

export type GraphQLResponse<T> = AxiosResponse<{
  data?: T,
  errors?: Record<string, string>
}>
