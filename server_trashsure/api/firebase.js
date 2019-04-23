const firebase = require('firebase/app');
require('firebase/database');

var config = {
    apiKey: "AIzaSyAoGbWY88FplMEBvjB2L1ujUPtK10MD8LU",
    authDomain: "trashure-d3285.firebaseapp.com",
    databaseURL: "https://trashure-d3285.firebaseio.com",
    projectId: "trashure-d3285",
    storageBucket: "trashure-d3285.appspot.com",
    messagingSenderId: "341366195051"
};
firebase.initializeApp(config);

module.exports = firebase;