const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = new Schema({
	id: {
		type: String,
		required: [true, 'id field is required.']
	},
	userName: {
		type: String,
		required: [true, 'userName field is required.']
	},
	password: {
		type: String,
		required: [true, 'password field is required.']
	}
})

const Users = mongoose.model('users', UsersSchema)

module.exports = Users