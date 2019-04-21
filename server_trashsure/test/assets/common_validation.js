require('dotenv').config();

//
//      U S E R
//
let registerValidation = {
    name: "Name must be filled",
    email_Required: "Email must be filled",
    email_Format: "Email invalid format",
    email_Unique: "Please check your email again",
    password: "Password must be filled",
    internalErr: 'Internal Server Error'
}
let loginValidation = {
    email: "Email / Password Wrong",
    password: "Email / Password Wrong",
    internalErr: 'Internal Server Error'
}
let authValidation = {
    auth: 'You not Authenticate',
    loginFirst: 'Login First',
    internalErr: 'Internal Server Error'
}
//
//  T R A S H
// 
let trashValidation = {
    path: 'Image must be taken',
    notFound: 'Trash not found',
    internalErr: 'Internal Server Error'
}
module.exports = {
    registerValidation, loginValidation, trashValidation, authValidation
}