const Subscription = {
	Spending: {
		subscribe(parent, args, {Message, Spending, Users, pubsub}, info) {
			return pubsub.asyncIterator(`Spending`)
		}
	}
};

export {Subscription as default}