const errorStackParser = require('error-stack-parser');
const { status } = require('./messages/api.response');

module.exports = {
    /**
     *
     * @param {*} error Error Object.
     * @param {*} APIName - API/Function name where error occurred - will be used if REQ is not available.
     * @param {*} req Request Object (optional).
     * @param {*} res Response Object (optional).
     * @param {*} customMessage Any custom message to send in API response. (optional)
     * @returns return response to client with message.
     */
    throwException(error, APIName, req = null, res = null, customMessage = null) {
        var parsedError;
        if (error instanceof Error && Object.prototype.hasOwnProperty.call(error, 'errors')) {
            error.message = error.errors[0]?.message || error.name;
            parsedError = errorStackParser.parse(error)[0].toString();
        }

        if (error instanceof Error) {
            if (req) {
                // eslint-disable-next-line no-console
                console.error(`Error in ${APIName}, URL: ${req.method} - ${req.url}:`, error.message);
            } else {
                // eslint-disable-next-line no-console
                console.error(`Error in ${APIName},`, error.message);
            }
        }

        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error('Error: ', error);
        }

        if (res) {
            var erMsg = 'Something went wrong, please try again!';
            if (customMessage) erMsg = customMessage;
            else if (error?.status && error?.message) erMsg = error.message;

            return res.status(error?.status ? error.status : status.InternalServerError).json({
                message: erMsg,
                error: error.message,
            });
        } else {
            return true;
        }
    },
};
