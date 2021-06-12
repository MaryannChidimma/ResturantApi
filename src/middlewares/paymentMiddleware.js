
const { VerifyTransaction } = require("../utils/payment")
const { BadRequestError } = require('../../lib/appError');

exports.verifyPayment = async (req, res, next) => {
    const token = req.body.transactionId

    const data = await VerifyTransaction(token)
    if (data) {
        req.transDetails = data;
        next();
    }
    else {
        throw new BadRequestError("Something went wrong, transaction Id might be invalid")
    }
}

