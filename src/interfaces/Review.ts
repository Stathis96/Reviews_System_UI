import Intern from './Intern'
import User from './User'

export default interface Review{
  id: string,
  intern: Intern,
  supervisor: User,
  initiative : number,
  cooperation : number,
  performance : number,
  consistency : number,
  total : number,
  createdAt: Date
}
