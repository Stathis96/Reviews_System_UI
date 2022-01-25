import Interview from './Interview'

export default interface Candidate{
  id: string,
  name: string,
  email: string,
  mobile: string,
  position: string,
  employmentType: string,
  degree: string,
  status: string,
  interviews: Interview[]
}
