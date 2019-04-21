const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull } = require('graphql');

const api = require('../helpers/api');
const UserType = require('./types/user');
const Trashtype = require('./types/trash');
const axios = require('axios')



const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            allData: {
                type: new GraphQLList(MoviesType),
                resolve: async () => {
                    const { data } = await api.getTrash();
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
                type: MoviesType,
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
                type: MoviesType,
                args: {
                    path: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: async (_previous, { path }, _context) => {
                    const { data } = await api.postTrash({ path });
                    return data;
                },
            },
            updateTrash: {
                type: Trashtype,
                args: {

                },
                resolve: async (_previous, { }, _context) => {
                    console.log('masuk update', movieID);

                    const { data } = await api.putEntertainmeMovie(movieID, {});
                    return data;
                },
            },
            deleteTrash: {
                type: Trashtype,
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