import React, { useState, useRef, useEffect } from 'react';
import { USERS_QUERY, CREATE_USERS_MUTATION } from '../graphql/index'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Button, Input, Space, Form, message } from 'antd'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function Sign(props) {
	const handleStateChange = props.Change
	const [username, setUsername] = useState("")
	const [userid, setUserid] = useState("")
	const [password, setPassword] = useState("")
	const [signin, setSignin] = useState(false)
	const [signup, setSignup] = useState(false)
	const signIn = useRef(1)
	const signUp = useRef(2)
	const { data: UData } = useQuery(USERS_QUERY,{
		variables: {
			user: username,
			pass: password
		},
	})
	const [addUsers] = useMutation(CREATE_USERS_MUTATION)

	const handleSignIn = (values) => {
		//check that user and password correct
		if (UData.Users.password) {
			setSignin(true)
			setSignup(false)
			setPassword("")
			setUserid(UData.Users.id)
		} else if (!(UData.Users.id === "default")) {
			message.error("Wrong password !!", 1.5)
		} else (
			message.warning("Username does not exist...", 1.5))
	}

	const handleSignUp = (values) => {
		if (!(UData.Users.id === "default")) {
			message.warning("Username is used", 1.5)
		} else {
			addUsers({
				variables: {
					userName: username,
					password: password
				}
			})
			setUserid(UData.Users.id)
			setPassword('')
			setSignin(true)
			setSignup(false)
		}
	}

	const handleReturn = () => {
		setSignin(false)
		setSignup(false)
	}

	useEffect(() => {
		handleStateChange(username, userid, signin, signup)
	}, [handleStateChange, username, userid, signin, signup])

	return (
		<div className="App__Sign">
			{!signup ? (
				<Form
					{...layout}
					name="basic"
					onFinish={handleSignIn}
				>
					<Form.Item
						label="Username"
						name="username"
						rules={[{
							required: true,
							message: 'Please input your username!',
						},]}
					>
						<Input 
							onChange={(e) => setUsername(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									signIn.current.focus()
								}
							}}
						/>
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[{
							required: true,
							message: 'Please input your password!',
						},]}
					>
						<Input.Password 
							onChange={(e) => setPassword(e.target.value)}
							ref={signIn}
						/>
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Space size={30}>
    						<Button type="primary" htmlType="submit">
    							Submit
    						</Button>
    						<Button onClick={() => {setSignup(true)}}>
    							Sign up
    						</Button>
    					</Space>
					</Form.Item>
				</Form>
			) : (
				<Form
					{...layout}
					name="basic"
					onFinish={handleSignUp}
				>
					<Form.Item
						label="Username"
						name="username"
						rules={[{
							required: true,
							message: 'Please input your username!',
						},]}
					>
						<Input 
							onChange={(e) => setUsername(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									signUp.current.focus()
								}
							}}
						/>
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[{
							required: true,
							message: 'Please input your password!',
						},]}
					>
						<Input.Password 
							onChange={(e) => setPassword(e.target.value)}
							ref = {signUp}
						/>
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Space size={30}>
    						<Button type="primary" htmlType="submit">
    							Submit
    						</Button>
    						<Button onClick={() => {handleReturn()}}>
    							Sign in
    						</Button>
    					</Space>
					</Form.Item>
				</Form>
					)}
			</div>
		)
}

export { Sign }