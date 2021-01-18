const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

if (!process.env.CLOCKIFY_SIGING_SECRET) {
  throw new Error("Error! You must specify ️CLOCKIFY_SIGING_SECRET")
}

const app = express()
const PORT = 3000
app.use(bodyParser.json())

app.post("/clockify/projects/new", (req, res) => {
  const clockifySignature = req.header('clockify-signature')
  if (clockifySignature === process.env.CLOCKIFY_SIGING_SECRET) {
    console.log('New project from Clockify!')
    console.log(res.body)
    res.status(200).end()
  } else {
    console.log('Unauthorized')
    res.status(401).json({message: 'Unauthorized'}).end()
  }
})

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
