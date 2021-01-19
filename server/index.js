import {GraphQLServer, PubSub } from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'

const pubsub = new PubSub()

require('dotenv-defaults').config()

const mongoose = require('mongoose')
const Spending = require('./models/spending')
const Users = require('./models/users')

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')
  
  function startQLserver(Spending,Users) {
    const QLserver = new GraphQLServer({
      typeDefs: './server/schema.graphql',
      resolvers: {
        Query,
        Mutation,
        Subscription
      },
      context: {
        Spending,
        Users,
        pubsub
      }
    })

    QLserver.start({port: process.env.PORT || 4000}, () => {
      console.log(`The QLserver is up on port ${process.env.PORT || 4000}`)
    })
  }

  startQLserver(Spending,Users)
})