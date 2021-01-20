import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({
	uri: `http://localhost:8080/`
})

const wsLink = new WebSocketLink({
	uri: `ws://localhost:8080/`,
	options: { reconnect: true, timeout: 30000, lazy:true }
})
//==============================================================
wsLink.subscriptionClient.on("connecting", () => {
  console.log("connecting");
});

wsLink.subscriptionClient.on("connected", () => {
  console.log("connected");
});

wsLink.subscriptionClient.on("reconnecting", () => {
  console.log("reconnecting");
});

wsLink.subscriptionClient.on("reconnected", () => {
  console.log("reconnected");
});

wsLink.subscriptionClient.on("disconnected", () => {
  console.log("disconnected");
});
//==============================================================
const link = split(
	({query}) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
			)
	},
	wsLink,
	httpLink
)

const client = new ApolloClient({
	link,
	cache: new InMemoryCache().restore({})
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
