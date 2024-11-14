const express = require('express')

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use(require('./routes'))

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`)
})
