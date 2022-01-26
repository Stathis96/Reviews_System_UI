import gql from 'graphql-tag'

export const createInternMutation = gql`
  mutation createIntern($createInternData: InternInputData!) {
    createIntern: createIntern(data: $createInternData) {
      id
      fullname
      email
      dateOfBirth
      position
      school
      academicYear
      hiredAt
      endInternship
      internStatus
      supervisor {
        id
        name
        email
      }
  }
}
`

export const updateInternMutation = gql`
 mutation updateIntern($createInternData: InternInputData!, $updateInternId: String!) {
  updateIntern: updateIntern(data: $createInternData, id: $updateInternId) {
    id
      fullname
      email
      dateOfBirth
      position
      school
      academicYear
      hiredAt
      endInternship
      internStatus
      supervisor {
        id
        name
        email
      }
  }
}
`

export const deleteInternMutation = gql`
  mutation deleteIntern($deleteInternId: String!) {
    deleteIntern: deleteIntern(id: $deleteInternId)
}
`
