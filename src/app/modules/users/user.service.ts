import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { genarateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //need auto ganarated incremental id.
  const id = await genarateUserId()
  user.id = id

  console.log(` this is final id after created user${id}`)

  //need default password need.
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createNewUser = await User.create(user)
  if (!createNewUser) {
    throw new Error('faild to create user')
  }
  return createNewUser
}

export default {
  createUser,
}
