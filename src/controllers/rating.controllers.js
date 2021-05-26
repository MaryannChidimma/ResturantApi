const RatingService = require("../services/rating.service")
const appResponse = require("../../lib/appResponse")

class RatingController {
    async create(req, res) {
        const data = await RatingService.create(req.body)

        res.send(appResponse("Menu Rated successfully", data))
    }
}