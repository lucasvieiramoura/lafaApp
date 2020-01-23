const express = require ('express')
const bodyParser = require ('body-parser')
const cors = require ('cors')

const db = require('./db')
const movieRouter = require('./routes/movie-router')

const app = express()
const apiPort = 8000

app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello Word!')
})

app.use('/api', movieRouter)

app.listen(apiPort, () => console.log(`Server runing os port ${apiPort}`))