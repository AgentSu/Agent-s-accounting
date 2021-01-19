import { gql } from 'apollo-boost'

export const SPENDING_SUBSCRIPTION = gql`
	subscription {
		Spending {
			mutation
			data {
				id
				user
				date
				type
				detail
				amount
			}
		}
	}
`