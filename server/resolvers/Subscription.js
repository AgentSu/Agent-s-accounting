const Subscription = {
	Spending: {
		subscribe(parent, args, {Message, Spending, Users, pubsub}, info) {
			return pubsub.asyncIterator(`Spending`)
		}
	}
};

module.exports = { Subscription }
//export {Subscription as default}