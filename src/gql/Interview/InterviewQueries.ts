import gql from 'graphql-tag'

export const getScheduledInterviews = gql`
  query getScheduledInterviews{
    scheduledInterviews: getScheduledInterviews {
        id
        startTime
        endTime
        status
        comments
        degree
        experience
        grading
        candidate {
          id
          name
          position
          status
          employmentType
        }
        interviewer {
          id
          name
          email
          position
        }
        }
    }
`

export const getOldInterviews = gql`
  query getOldInterviews{
    oldInterviews: getOldInterviews {
        id
        startTime
        endTime
        status
        comments
        degree
        experience
        grading
        candidate {
          id
          name
          position
          status
          employmentType
        }
        interviewer {
          id
          name
          email
          position
        }
      }
    }
`
// export const getInterviewsByStatus = gql`
//   query getInterviewsByStatus{
//     pendingInterviews: getInterviewsByStatus(status:"pending") {
//         id
//         startTime
//         endTime
//         status
//         comments
//         degree
//         experience
//         grading
//         candidate {
//           id
//           name
//           position
//           status
//           employmentType
//         }
//         interviewer {
//           id
//           name
//           email
//           position
//         }
//         }
//     }
// `
export const getInterviewsByStatus = gql`
  query getInterviewsByStatus($getInterviewsByStatus: String!){
    pendingInterviews: getInterviewsByStatus(status:$getInterviewsByStatus) {
        id
        startTime
        endTime
        status
        comments
        degree
        experience
        grading
        candidate {
          id
          name
          position
          status
          employmentType
        }
        interviewer {
          id
          name
          email
          position
        }
        }
    }
`
export const findPercentageOfInterviews = gql`
  query findPercentageOfInterviews{
    interviewsStats: findPercentageOfInterviews{
    name
    value
    }
  }
`

export const findPercentageOfInterviewsMonthly = gql`
  query findPercentageOfInterviewsMonthly($findPercentageOfInterviewsMonthly: Float!) {
    interviewsPeriodStats: findPercentageOfInterviewsMonthly(months: $findPercentageOfInterviewsMonthly) {
    name
    value
  }
}
`
