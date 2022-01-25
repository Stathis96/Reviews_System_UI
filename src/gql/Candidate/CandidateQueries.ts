import gql from 'graphql-tag'

export const getUsers = gql`
  query getUsers{
    allUsers: getUsers{
      name
      id
      email
    }
  }
`

export const getCandidates = gql`
query getCandidates($getCandidatesData: PaginationInputData!) {
  allCandidates : getCandidates(data: $getCandidatesData) {
    context{
      id
      name
      email
      degree
      employmentType
      position
      status
      mobile
      interviews {
          id
        }
    }
      total
  }
}
`

export const getCandidatesByStatus = gql`
  query getCandidatesByStatus($getCandidatesByStatus: String!){
    statusCandidates: getCandidatesByStatus(status:$getCandidatesByStatus) {
      name
      id
      email
      mobile
      degree
      position
      employmentType
      status
      interviews {
        id
      }
    }
    }
`
