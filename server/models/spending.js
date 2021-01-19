const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SpendingSchema = new Schema({
	id: {
		type: String,
		required: [true, 'id field is required.']
	},
	user: {
		type: String,
		required: [true, 'user field is required.']
	},
	date: {
		type: String,
		required: [true, 'date field is required.']
	},
	type: {
		type: String,
		required: [true, 'type field is required.']
	},
	detail: {
		type: String,
		required: [true, 'detail field is required.']
	},
	amount: {
		type: Number,
		required: [true, 'amount field is required.']
	}
})

const Spending = mongoose.model('spending', SpendingSchema)

module.exports = Spending