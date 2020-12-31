const mongoose = require('mongoose')

if(process.argv.length < 3) {
	throw new Error('error: please provide at least a database password')
}

const connectionUrl = process.env.MONGODB_URI
mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
	Person.find({}).then(result => {
		result.forEach((note) => {
			console.log(note)
		})
		mongoose.connection.close()
	})
}
else if(process.argv.length === 5){
	const personName = process.argv[3]
	if(!(typeof personName === 'string')){
		throw new Error('error: name is not a string')
	}
	const personNumber = process.argv[4]
	if(!(typeof personNumber === 'string')){
		throw new Error('error: name is not a string')
	}

	const personData = {
		name: personName,
		number: personNumber
	}
	const person = new Person(personData)

	person.save().then(result => {
		console.log(`Person added to phonebook: ${JSON.stringify(personData)}`)
		mongoose.connection.close()
	})
}
else {
	console.log(process.argv.length)
	throw new Error('error: wrong number of arguments')
}
