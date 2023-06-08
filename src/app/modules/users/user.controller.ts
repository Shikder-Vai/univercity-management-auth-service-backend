import { Request, Response } from 'express'
import userService from './user.service'

const createUserController = async (req: Request, res: Response) => {
  try {
    const { user } = await req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      massage: 'user create successfuly',
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      massage: `faild to create user for this ${err} `,
    })
  }
}

export default {
  createUserController,
}
