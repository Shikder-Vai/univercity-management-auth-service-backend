import mongoose from 'mongoose'

import config from './config/index'
import app from './app'

async function bootstart() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`🧠 Brain connected successfully`)

    app.listen(config.port, () => {
      console.log(`Univercity Management listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(`🧠 Brain not connected`, err)
  }
}

bootstart()
