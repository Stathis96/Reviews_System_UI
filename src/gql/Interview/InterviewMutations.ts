import gql from 'graphql-tag'

export const createInterviewMutation = gql`
mutation createInterview($createInterviewData: InterviewInputData!){
  createInterview: createInterview(data: $createInterviewData) {
    comments
    degree
    experience
    endTime
    grading
    id
    startTime
    status
    candidate {
      id
      name
      email
      position
      status
    }
    interviewer {
      id
      position
      name
      email
    }
  }
}
`
export const updateInterviewMutation = gql`
mutation updateInterview($createInterviewData: InterviewInputData!, $updateInterviewId: String!){
  updateInterview: updateInterview(data: $createInterviewData, id: $updateInterviewId) {
    comments
    degree
    experience
    endTime
    grading
    id
    startTime
    status
    candidate {
      id
      name
      email
      position
      status
    }
    interviewer {
      id
      position
      name
      email
    }
  }
}
`

export const deleteInterviewMutation = gql`
  mutation deleteInterview($deleteInterviewId: String!) {
    deleteInterview: deleteInterview(id: $deleteInterviewId)
}
`
