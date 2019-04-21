const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull } = require('graphql');

const api = require('../helpers/api');
const UserType = require('./types/user');
const TrashType = require('./types/trash');
const axios = require('axios')



const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            allData: {
                type: new GraphQLList(TrashType),
                args: {
                    token: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: async (_previous, { token }, _context) => {

                    console.log(token, "=====");

                    const { data } = await api.getTrash(token);
                    return data
                }
            },
        }
    }),

    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: {
            //
            //  U S E R
            // 
            register: {
                type: TrashType,
                args: {
                    path: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: async (_previous, { path }, _context) => {
                    const { data } = await api.postTrash({ path });
                    return data;
                },
            },
            //
            //  T R A S H
            // 
            createTrash: {
                type: TrashType,
                args: {
                    token: { type: new GraphQLNonNull(GraphQLString) },
                    path: { type: new GraphQLNonNull(GraphQLString) },
                    location: { type: GraphQLString },
                    description: { type: GraphQLString },
                },
                resolve: async (_previous, { token, path, location, description }, _context) => {
                    const { data } = await api.postTrash(token, { path, location, description });
                    return data;
                },
            },
            deleteTrash: {
                type: TrashType,
                args: {
                    trashID: { type: new GraphQLNonNull(GraphQLID) },
                    token: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: async (_previous, { trashID, token }, _context) => {
                    const { data } = await api.deleteTrash(trashID, token);
                    return data;
                },
            }
        },
    }),

})
module.exports = schema;