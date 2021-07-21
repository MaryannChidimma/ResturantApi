
const contactUs = require("../models/contactUs")
const mailer = require("../utils/mailer")

class contactUsService {

    create = async (data) => {
        return await contactUs.create(data)

    }
    getAll = async () => {
        return await contactUs.find({})
    }
    replyMessage = async (data) => {
        const { email, message } = data

        return await mailer.mailComposer(
            email,
            "eva Kitchen ",
            "replyMessage",
            {
                message
            }

        )

    }

    delete = async (id) => {
        return await contactUS.remove({ _id: id })
    }
}

module.exports = new contactUsService();