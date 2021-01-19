import { gql } from 'apollo-boost'

const CREATE_SPENDING_MUTATION = gql`
	mutation createSpending(
		$user: String!
		$date: String!
		$type: String!
		$detail: String!
		$amount: Int!
	) {
		createSpending(
			data: {
				user: $user
				date: $date
				type: $type
				detail: $detail
				amount: $amount
			}
		) {
			id
			user
			date
			type
			detail
			amount
		}
	}
`

const DELETE_SPENDING_MUTATION = gql`
	mutation deleteSpending(
		$id: String!
	) {
		deleteSpending(id: $id) {
			id
		}
	}
`

const CREATE_USERS_MUTATION = gql`
	mutation createUsers(
		$userName: String!
		$password: String!
	) {
		createUsers(
			data: {
				userName: $userName
				password: $password
			}
		) {
			id
			userName
			password
		}
	}
`

const DELETE_USERS_MUTATION = gql`
	mutation deleteUsers(
		$id: String!
		$password: String!
	) {
		deleteUsers(id: $id, pass: $password) {
			id
		}
	}
`

export {CREATE_SPENDING_MUTATION, DELETE_SPENDING_MUTATION, CREATE_USERS_MUTATION, DELETE_USERS_MUTATION}