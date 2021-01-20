import './App.css';
import React, { useState, useEffect } from 'react';
import { DetailList, Overview, Sign, New } from './containers/index';
import { SPENDING_QUERY, DELETE_SPENDING_MUTATION, SPENDING_SUBSCRIPTION} from './graphql/index'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Layout, Tag, message } from 'antd'

const { Header, Content, Footer } = Layout

function App() {
	const [username, setUsername] = useState("")
	const [userid, setUserid] = useState("")
	const [signin, setSignin] = useState(false)
	const [signup, setSignup] = useState(false)
	const [deleteSpending] = useMutation(DELETE_SPENDING_MUTATION)

	const { data: SData, subscribeToMore } = useQuery(SPENDING_QUERY,{
		variables: {
			user: username
		},
	})

	useEffect(() => {
		subscribeToMore({
			document: SPENDING_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				console.log("subscribeToMore!!!")
				const pre_data = prev.Spending
				const sub_data = subscriptionData.data.Spending.data
				const sub_type = subscriptionData.data.Spending.mutation
				if (sub_type === "CREATED") {
					if (!sub_data) {return prev}
					else {return {...prev, Spending: [...prev.Spending, subscriptionData.data.Spending.data]}}
				} else if (sub_type === "DELETED") {
					if (!sub_data) {return prev}
					else {return {...prev.Spending.filter((e) => {return e.user !== null})}}
				}
			}
		})
	}, [subscribeToMore])

	const handleStateChange = (username, userid, signin, signup) => {
		setUsername(username)
		setUserid(userid)
		setSignin(signin)
		setSignup(signup)
	}

	const handleSpendingEdit = (cases, id) => {
		if (cases === "DELETE") {
			deleteSpending({
				variables: {
					id: id
				}
			})
		} else {
			message.warning("Edit not implement yet!!")
		}
	}

	return (
	    <div className="App">
	    	<div className="Sign__Header">{!signin ? (!signup ? ("Sign In") : ( "Sign Up" )) : ("")}</div>
	    	{!signin ? (
	    		<Sign Change={handleStateChange}/>
	    		) : (
	    			<Layout>
	    				<Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
	    					<div style={{ color: 'white'}}>My Accounting Web
	    						<Tag color="blue">{username}</Tag>
	    					</div>
	    				</Header>
    					<Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
    						<New user={username}/>
	    					<p/>
				    		<Overview data={SData}/>
				    		<p/>
				    		<DetailList data={SData} edit={handleSpendingEdit}/>
				    	</Content>
				    	<Footer style={{ textAlign: 'center' }}>Let's write something here</Footer>
		    		</Layout>
	    		)
	    	}
	    </div>
	);
}

export default App;
