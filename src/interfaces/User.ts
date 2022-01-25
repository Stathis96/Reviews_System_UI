import Intern from './Intern'
import Interview from './Interview'
import Review from './Review'

export default interface User{
  id: string,
  name: string,
  email: string
  position: string,
  interns : Intern[],
  interviews: Interview[],
  reviews: Review[]
}
