import Candidate from './Candidate'

export default interface PaginatedCandidates{
  context : Candidate[],
  total: number
}
