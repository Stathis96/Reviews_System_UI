import Review from './Review'
import User from './User'

export default interface Intern{
  id: string,
  fullname: string,
  email: string,
  dateOfBirth: string,
  position: string,
  school: string,
  academicYear: Date,
  supervisor: User,
  hiredAt: Date,
  endInternship: Date,
  internStatus: string,
  reviews: Review[]
}
