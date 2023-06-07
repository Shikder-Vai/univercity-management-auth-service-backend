import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

//cors setup
app.use(cors(sdh))

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//testing
app.get('/', (req: Request, res: any) => {
  res.send('application successfully working')
})

export default app
