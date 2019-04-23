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
                    console.log('masukmlogin ---------');
                    
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
                    title: { type: new GraphQLNonNull(GraphQLString) },
                    description: { type: new GraphQLNonNull(GraphQLString) },
                    coordinate: { type: new GraphQLNonNull(GraphQLString) },
                    createdAt: { type: new GraphQLNonNull(GraphQLString) },
                    token: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: async (_previous, { path, title, description, coordinate, createdAt, token }, _context) => {
                    try {
                        const { data } = await api.postTrash(token, { path, title, description, coordinate, createdAt });
                        return data
                    } catch (error) {
                        console.log(error, "======");
                    }
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