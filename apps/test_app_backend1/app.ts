import express from 'express'
import { historyRoute1, historyRoute2 } from './routes'

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use(historyRoute1, historyRoute2)

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`)
})
