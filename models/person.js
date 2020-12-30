const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//connect to db via mongoose and dotenv-configured environment variable
const connectionUrl = process.env.MONGODB_URI
mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

//create schema for a phonebook entry
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  number: {
    type: String,
    required: true,
    minLength: 8
  }
})

personSchema.plugin(uniqueValidator)

//edit the toJSON function so that a document's _id becomes an id string
personSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//build a model from personSchema and export
module.exports = mongoose.model('Person', personSchema)
