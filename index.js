const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
morgan.token('body', (req, res) => {
  return req.method === 'POST' ?
  JSON.stringify(req.body):
  null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
let persons = [
  {
    id: 2346,
    name: "Einstein",
    number: "3333333"
  },
  {
    id: 5680,
    name: "Borges",
    number: "777777777"
  },
  {
    id: 23,
    name: "Rounak",
    number: "123456789"
  }
]

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if(person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.get('/api/persons/', (request, response) => {
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


app.post('/api/persons/', (request, response) => {
  const generateId = () => {
    return Math.floor(Math.random() * 10000)
  }
  const body = request.body

  if(!body.name) {
    return response.status(400).json({
      error: `No name provided`
    })
  }

  if(!body.number) {
    return response.status(400).json({
      error: `No number provided`
    })
  }

  const name = persons.find(person => person.name === body.name)
  if(name) {
    return response.status(400).json({
      error: `${body.name} is already in the phonebook`
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = [...persons, person]

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('App running on port 3001')
})

app.get('/info', (request, response) => {
  const now = new Date().toLocaleString('en-US')

  response.end(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${now}</p>`)
})
