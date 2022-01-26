import gql from 'graphql-tag'

export const createReviewMutation = gql`
mutation createReview($createReviewData: ReviewInputData!) {
  createReview: createReview(data: $createReviewData) {
    id
    consistency
    cooperation
    initiative
    performance
    total
    createdAt
    intern {
      id
      fullname
      email
    }
    supervisor {
      id
      name
    }
  }
}
`

export const updateReviewMutation = gql`
mutation updateReview($createReviewData: ReviewInputData!, $updateReviewId: String!){
  updateReview: updateReview(data: $createReviewData, id: $updateReviewId) {
    id
    consistency
    cooperation
    initiative
    performance
    total
    createdAt
    intern {
      id
      fullname
      email
    }
    supervisor {
      id
      name
    }
  }
}
`

export const deleteReviewMutation = gql`
  mutation deleteReview($deleteReviewId: String!) {
    deleteReview: deleteReview(id: $deleteReviewId)
}
`
