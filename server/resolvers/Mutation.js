import uuidv4 from 'uuid/v4'

const Mutation = {
	createSpending(parents, args, {Message, Spending, Users, pubsub}, info) {
		const newSpending = {id: uuidv4(), ...args.data}
		Spending.create(newSpending)
		pubsub.publish('Spending', {
			Spending: {
				mutation: 'CREATED',
				data: newSpending
			}
		})
		return newSpending
	},

	async deleteSpending(parents, args, {Message, Spending, Users, pubsub}, info) {
		await Spending.deleteMany({"id":args.id})
		pubsub.publish('Spending', {
			Spending: {
				mutation: 'DELETED',
				data: {
					id: args.id,
					user: null,
					date: null,
					type: null,
					detail: null,
					amount: 0
				}
			}
		})
	},

	async createUsers(parents, args, {Message, Spending, Users, pubsub}, info) {
		const users = await Users.find()
		const newUsers = {id: uuidv4(), ...args.data}
		let userExisted = false
		users.forEach(e => {if (e.userName === args.data.userName) { userExisted = true }})
		if (!userExisted) {
			Users.create(newUsers)
			return {id: newUsers.id, userName: newUsers.userName, password: true}
		} else {
			return {id: "null", userName: args.data.userName, password: false}
		}
	},

	async deleteUsers(parents, args, {Message, Spending, Users, pubsub}, info) {
		await Users.deleteMany({"id":args.id, "password":args.pass})
	}
}

export { Mutation as default }