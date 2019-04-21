const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString } = require('graphql');


const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    }
})
module.exports = UserType;