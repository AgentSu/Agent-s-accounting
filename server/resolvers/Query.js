const Query = {
	async Spending(parents, args, {Message, Spending, Users, pubsub}, info) {
		let result = []
		const spending = await Spending.find()
		if (!args.user) {
			spending.forEach(e => {result.push(e)})
		} else {
			const user = args.user
			spending.filter(spending => {
				if (spending.user === user) {
					result.push(spending)
				}
			})
		}
		return result
	},

	async Users(parents, args, {Message, Spending, Users, pubsub}, info) {
		const users = await Users.find()
		if (!args.user) {
			let result = []
			users.forEach(e => {result.push(e.userName)})
			return result
		} else {
			const user = args.user
			const password = args.pass
			let result = {
				id: "default",
				userName: user,
				password: false
			}
			users.filter(users => {
				if (users.userName === user) {
					result.id = users.id
					if (users.password === password) {
						result.password = true
					}
				}
			})
			return result
		}
		
	}
};

export { Query as default }