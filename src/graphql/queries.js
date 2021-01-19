import { gql } from 'apollo-boost'

const SPENDING_QUERY = gql`
	query Spending(
		$user: String
	) {
		Spending(user: $user) {
			id
			user
			date
			type
			detail
			amount
		}
	}
`

const USERS_QUERY = gql`
	query Users(
		$user: String!
		$pass: String!
	) {
		Users(user: $user, pass: $pass) {
			id
			userName
			password
		}
	}
`

export {SPENDING_QUERY, USERS_QUERY}