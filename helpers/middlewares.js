const error = require('../helpers/error');

const notFound = (req, res, next) => {
    const err = error.notFound();

    console.log(err);

    res.send(err);
};

const errorHandler = (err, req, res, next) => {
    err.status = err.status || 500;

    const {
        message,
        status,
        stack
    } = err;

    const response = {
        message,
        status,
        stack
    };

    if (process.env.NODE_ENV === 'production') {
        delete response.stack;
    }

    res.status(err.status).send(response);
};

module.exports = {
    notFound,
    errorHandler
}