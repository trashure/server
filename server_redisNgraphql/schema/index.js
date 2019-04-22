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
            garbages: {
                type: new GraphQLList(TrashType),
                args: {
                    token: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: async (_previous, { token }, _context) => {
                    const { data } = await api.getTrash(token);
                    return data
                }
            },
            collections: {
                type: new GraphQLList(TrashType),
                args: {
                    token: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: async (_previous, { token }, _context) => {
                    const { data } = await api.getCollection(token);
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
                type: UserType,
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    email: { type: new GraphQLNonNull(GraphQLString) },
                    password: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: async (_previous, { name, email, password }, _context) => {
                    const { data } = await api.register({ name, email, password });
                    return data;
                },
            },
            login: {
                type: UserType,
                args: {
                    email: { type: new GraphQLNonNull(GraphQLString) },
                    password: { type: new GraphQLNonNull(GraphQLString) },

                },
                resolve: async (_previous, { email, password }, _context) => {
                    const { data } = await api.login({ email, password })
                    return data
                }
            },
            //
            //  T R A S H
            // 
            createTrash: {
                type: TrashType,
                args: {
                    path: { type: new GraphQLNonNull(GraphQLString) },
                    token: { type: new GraphQLNonNull(GraphQLString) },
                    description: { type: new GraphQLNonNull(GraphQLString) },
                    location: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: async (_previous, { path, token }, _context) => {
                    try {
                        const { data } = await api.postTrash(token, { path });
                        console.log(data, "=====");
                        
                        return data

                    } catch (error) {
                        console.log(error, "======");                      
                    }
                },
            },
            updateTrash: {
                type: TrashType,
                args: {

                },
                resolve: async (_previous, { }, _context) => {
                    console.log('masuk update', movieID);

                    const { data } = await api.putEntertainmeMovie(movieID, {});
                    return data;
                },
            },
            deleteTrash: {
                type: TrashType,
                args: {
                    trashID: { type: new GraphQLNonNull(GraphQLID) },
                },
                resolve: async (_previous, { trashID }, _context) => {
                    const { data } = await api.deleteTrash(trashID);
                    return data;
                },
            }
        },
    }),

})
module.exports = schema;