const axios = require('axios')
const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config()

if (!process.env.CLOCKIFY_SIGING_SECRET) {
  throw new Error("Error! You must specify ️CLOCKIFY_SIGING_SECRET")
}

if (!process.env.SLACK_HOOK) {
  throw new Error("Error! You must specify SLACK_HOOK")
}

const app = express()
const PORT = 3000
app.use(bodyParser.json())

app.post("/clockify/projects/new", (req, res) => {
  const clockifySignature = req.header('clockify-signature')
  if (clockifySignature === process.env.CLOCKIFY_PROJECT_CREATED_SECRET) {
    console.log('New project from Clockify!')
    console.log(req.body)
    const { name, clientName } = req.body
    res.status(200).end()

    axios
      .post(process.env.SLACK_HOOK, { text: `:clap: A new project has been created with name *${name}* for client *${clientName}*!` })
      .then((_res) => {
        console.log('Message sent to Slack webhook!')
        // console.log(res)
      })
      .catch((error) => {
        console.log('Error sending message to Slack webhook!')
        console.error(error)
      })
  } else {
    console.log('Unauthorized')
    res.status(401).json({message: 'Unauthorized'}).end()
  }
})

app.post("/clockify/clients/new", (req, res) => {
  const clockifySignature = req.header('clockify-signature')
  if (clockifySignature === process.env.CLOCKIFY_CLIENT_CREATED_SECRET) {
    console.log('New client from Clockify!')
    console.log(req.body)
    const { name } = req.body
    res.status(200).end()

    // axios
    //   .post(process.env.SLACK_HOOK, { text: `:muscle: A new client has been created with name *${name}*!` })
    //   .then((_res) => {
    //     console.log('Message sent to Slack webhook!')
    //     // console.log(res)
    //   })
    //   .catch((error) => {
    //     console.log('Error sending message to Slack webhook!')
    //     console.error(error)
    //   })
  } else {
    console.log('Unauthorized')
    res.status(401).json({message: 'Unauthorized'}).end()
  }
})

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
