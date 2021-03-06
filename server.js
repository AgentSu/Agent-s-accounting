const express = require('express');
const path = require('path');
const port = process.env.PORT || 80;
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log("Server Ready!")

//==========================================================
const {GraphQLServer, PubSub } = require('graphql-yoga')
const {Query} = require('./server/resolvers/Query')
const {Mutation} = require('./server/resolvers/Mutation')
const {Subscription} = require('./server/resolvers/Subscription')

const pubsub = new PubSub()

require('dotenv-defaults').config()

const mongoose = require('mongoose')
const Spending = require('./server/models/spending')
const Users = require('./server/models/users')

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
db.once('open', () => {console.log('MongoDB connected!')})
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
QLserver.start({port: 4000}, () => {console.log(`The QLserver is up on port 4000`)})