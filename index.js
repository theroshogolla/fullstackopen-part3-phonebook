require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.json())

morgan.token('body', (req, res) => {
  return req.method === 'POST' ?
  JSON.stringify(req.body):
  null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('build'))

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
    },
    {
        id: 3527,
        name: "Newton",
        number: "4444444"
    }
]

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if(person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.get('/api/persons/', (request, response, next) => {
  Person.find({})
  .then(persons => response.json(persons))
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result =>
    response.status(204).end())
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
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

  const contact = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, contact, {runValidators: true, context: 'query', new: true})
  .then(newContact => {
    response.json(newContact)
  })
  .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
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

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
  .then(newContact => response.json(newContact))
  .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('App running on port 3001')
})

app.get('/info', (request, response) => {
  const now = new Date().toLocaleString('en-US')

  Person.find({})
  .then(persons => {
    response.end(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${now}</p>`)
  })
  .catch(error => next(error))


})

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({error: 'unknown endpoint'})
  next()
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).send({error: error.message})
  }

  next(error)
}

app.use(errorHandler)
