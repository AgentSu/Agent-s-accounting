const express = require('express');
const path = require('path');
const port = process.env.PORT || 80;
const app = express();
import { graphqlExpress } from 'apollo-server-express';
const myGraphqlSchema = require('./server/schema.graphql')

app.use(express.static(path.join(__dirname, 'build')));

const bodyParser = require('body-parser')
//app.use(bodyParser.json());
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphqlSchema}))

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log("Server Ready!")