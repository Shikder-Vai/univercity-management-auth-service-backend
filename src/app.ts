import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import userRouter from './app/modules/users/user.router'

const app: Application = express()

//cors setup
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//user routers
app.use('/api/v1/user', userRouter)
//testing
app.get('/', async (req: Request, res: Response) => {
  res.send('application successfully working')
})

export default app
