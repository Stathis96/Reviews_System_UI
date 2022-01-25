import gql from 'graphql-tag'

export const createCandidateMutation = gql`
  mutation createCandidate($createCandidateData: CandidateInputData!) {
    createCandidate: createCandidate(data: $createCandidateData) {
      id
      name
      email
      mobile
      position
      degree
      status
      employmentType
      interviews {
        id
      }
  }
}
`
export const updateCandidateMutation = gql`
 mutation updateCandidate($createCandidateData: CandidateInputData!, $updateCandidateId: String!) {
  updateCandidate: updateCandidate(data: $createCandidateData, id: $updateCandidateId) {
      id
      name
      email
      mobile
      position
      degree
      status
      employmentType
      interviews {
        id
      }
  }
}
`

export const deleteCandidateMutation = gql`
  mutation deleteCandidate($deleteCandidateId: String!) {
    deleteCandidate: deleteCandidate(id: $deleteCandidateId)
}
`
