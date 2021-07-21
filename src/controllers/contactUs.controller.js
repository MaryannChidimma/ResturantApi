const contactUsService = require("../services/contactUs.services")
const appResponse = require("../../lib/appResponse")

class contactUsController {

    create = async (req, res) => {
        await contactUsService.create(req.body)
        res.send(appResponse("messege sent successfully"))
    }

    getAll = async (req, res) => {
        const messages = await contactUsService.getAll()
        res.send(appResponse("users messages", messages))
    }

    replyMessages = async (req, res) => {
        await contactUsService.replyMessage(req.body)
        res.send(appResponse("email sent"))
    }
    delete = async (req, res) => {
        await contactUsService.delete(req.query.id)
    }
}

module.exports = new contactUsController();