// Setup empty JS object to act as endpoint for all routes
projectData = {

}

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

// require body psrser
const bodyParser = require('body-parser')

/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const Cors = require('Cors')
app.use(Cors())
// Initialize the main project folder
app.use(express.static('website'))

// Setup Server
const port = 5500
const server = app.listen(port, () => { console.log(`running on 127.0.0.1:${port}`) })

// GET method route
app.get('/all', (req, res) => {
  // res.send('GET request to the homepage good')
  res.send(projectData)
})

// POST method route
app.post('/all', (req, res) => {
  //projectData.push(req.body)
  projectData.date=req.body.date
  projectData.temp=req.body.temp
  projectData.feel=req.body.feel
  projectData.city=req.body.city
  console.log(projectData)
  // res.end()
})
