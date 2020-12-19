/**
 * SUCCESS RESPONSE HELPER
 */
exports.successResponse = (code, message, response) => {
    let data = {
        code: code,
        status: "success",
        message: message,
        responceData: response
    }
    return data;
};

/**
 * ALERT RESPONSE HELPER
 */
exports.alertResponse = (code, message, response) => {
    let data = {
        code: code,
        status: "alert",
        message: message,
        responceData: response
    }
    return data;
};

/**
 * ERROR RESPONSE HELPER
 */
exports.errorResponse = (code, message, response) => {
    let data = {
        code: code,
        status: "error",
        message: message,
        responceData: response
    }
    return data;
}