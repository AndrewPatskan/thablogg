'use strict';

const baseErr = (msg = 'Bad request', status = 400) => {
    const err = new Error(msg);

    err.status = status;
    console.log(err);

    return err; 
};

module.exports = {
    notFound: () => baseErr('Not found', 404),
    forbidden: () => baseErr('Forbidden', 403), 
    unAuthorized: () => baseErr('Not authorized', 401),
    wrongPassword: () => baseErr('Wrong password', 401),
    emailNotValid: () => baseErr('Email validation failed!'),
    wrongEmail: () => baseErr('Email is not registered', 401),
    notEnoughtParams: () => baseErr('Not enought params'),
    passwordNotValid: () => baseErr('Password validation failed'),
    serverError: () => baseErr('Internal server or db error', 500),

    throw: (error) => {
        console.log(error);
        throw error;
    }
};