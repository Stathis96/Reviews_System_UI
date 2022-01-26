import gql from 'graphql-tag'

export const getSingleIntern = gql`
  query getSingleIntern($getInternById: String!) {
    singleIntern: getInternById(id: $getInternById) {
      id
      fullname
      email
      position
      internStatus
      hiredAt
      dateOfBirth
      academicYear
      school
      endInternship
      supervisor {
        name
        id
      }
      reviews {
        id
        initiative
        cooperation
        performance
        consistency
        total
        createdAt
          supervisor {
            name
            id
          }
          intern {
            id
            fullname
          }
      }
    }
  }
`
// export const getInternsbyStatus = gql`
//   query getInternsbyStatus($getInternsByStatus: String!) {
//   internsByStatus: getInternsByStatus(status: $getInternsByStatus) {
//         id
//         fullname
//         email
//         dateOfBirth
//         school
//         academicYear
//         hiredAt
//         endInternship
//         position
//         internStatus
//         reviews {
//           id
//           total
//         }
//         supervisor {
//           id
//           name
//           email
//         }
//       }
// }
// `

export const getActiveInterns = gql`
  query getInternsbyStatus($getInternsByStatus: String!) {
      activeInterns: getInternsByStatus(status: $getInternsByStatus) {
        id
        fullname
        email
        dateOfBirth
        school
        academicYear
        hiredAt
        endInternship
        position
        internStatus
        reviews {
          id
          total
        }
        supervisor {
          id
          name
          email
        }
      }
    }
`

export const getOtherInterns = gql`
    query getOtherInterns {
      otherInterns: getInterns(status: "active") {
        id
        fullname
        email
        dateOfBirth
        school
        academicYear
        hiredAt
        endInternship
        position
        internStatus
        reviews {
          id
          total
        }
        supervisor {
          id
          name
          email
        }
      }
    }
`
export const findPercentageOfInterns = gql`
  query findPercentageOfInterns{
    internsStats: findPercentageOfInterns{
    name
    value
    }
  }
`

export const findPercentageOfInternsMonthly = gql`
query findPercentageOfInternsMonthly($findPercentageOfInternsMonthly: Float!) {
  internsPeriodStats:findPercentageOfInternsMonthly(months: $findPercentageOfInternsMonthly) {
    name
    value
  }
}
`
