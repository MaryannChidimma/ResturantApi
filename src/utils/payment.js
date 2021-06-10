
const fetch = require('node-fetch')
const { BadRequestError } = require('../../lib/appError')

exports.VerifyTransaction = async (token) => {
    const url = `https://api.flutterwave.com/v3/transactions/${token}/verify`
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer FLWSECK_TEST-af996f826c53c3a8b77963ed5e2e8ec8-X"
        }
    }

    const response = await fetch(url, options);
    const details = await response.json();

    if (details) {

        return {
            id: details.data.id,
            amount: details.data.amount,
            charged_amount: details.data.charged_amount,
            status: details.data.status,
            payment_type: details.data.payment_type,
            created_at: details.data.created_at,
            account_id: details.data.account_id,
        }


    }
    else {
        throw new BadRequestError("transaction failed")
    }
}


