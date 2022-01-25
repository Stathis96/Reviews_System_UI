import Candidate from './Candidate'
import User from './User'

export default interface Interview{
  id: string,
  candidate: Candidate,
  interviewer: User,
  startTime: Date,
  endTime: Date,
  experience : number,
  degree : number,
  comments: string,
  grading : number,
  status: string
}
