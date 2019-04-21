require('dotenv').config();
const express = require('express'),
    app = express(),
    graphqlHTTP = require('express-graphql'),
    port = 4000,
    cors = require('cors'),
    schema = require('./schema/');

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(port, () => { console.log(`GraphQL running on localhost: ${port}`) });
