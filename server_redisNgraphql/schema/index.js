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
<<<<<<< HEAD
                type: UserType,
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    email : { type: new GraphQLNonNull(GraphQLString) },
                    password : { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: async (_previous, { name, email, password }, _context) => {
                    const { data } = await api.register({ name, email, password });
                    return data;
                },
            },
            login : {
                type : UserType,
                args : {
                    email : { type: new GraphQLNonNull(GraphQLString) },
                    password : { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: async (_previous, {email, password}, _context) => {
                    const { data } = await api.login({email, password})
                    console.log(data);
                    
                    return data
                }
            },
=======
                type: TrashType,
                args: {
                    path: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: async (_previous, { path }, _context) => {
                    const { data } = await api.postTrash({ path });
                    return data;
                },
            },
>>>>>>> 50440c45eb7d16ee8012063e1f244e12277c66d0
            //
            //  T R A S H
            // 
            createTrash: {
                type: TrashType,
                args: {
<<<<<<< HEAD
                    path: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: async (_previous, { path }, _context) => {
                    const { data } = await api.postTrash({ path });
                    return data;
                },
            },
            updateTrash: {
                type: TrashType,
                args: {

                },
                resolve: async (_previous, { }, _context) => {
                    console.log('masuk update', movieID);

                    const { data } = await api.putEntertainmeMovie(movieID, {});
=======
                    token: { type: new GraphQLNonNull(GraphQLString) },
                    path: { type: new GraphQLNonNull(GraphQLString) },
                    location: { type: GraphQLString },
                    description: { type: GraphQLString },
                },
                resolve: async (_previous, { token, path, location, description }, _context) => {
                    const { data } = await api.postTrash(token, { path, location, description });
>>>>>>> 50440c45eb7d16ee8012063e1f244e12277c66d0
                    return data;
                },
            },
            deleteTrash: {
                type: TrashType,
                args: {
                    trashID: { type: new GraphQLNonNull(GraphQLID) },
<<<<<<< HEAD
                },
                resolve: async (_previous, { trashID }, _context) => {
                    const { data } = await api.deleteTrash(trashID);
=======
                    token: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: async (_previous, { trashID, token }, _context) => {
                    const { data } = await api.deleteTrash(trashID, token);
>>>>>>> 50440c45eb7d16ee8012063e1f244e12277c66d0
                    return data;
                },
            }
        },
    }),

})
module.exports = schema;