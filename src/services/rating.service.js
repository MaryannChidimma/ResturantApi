
const model = require('../models/rating')

class RatingService {
    async create(data) {
        const rate = data.rating
        return model.create(data)
    }

}

module.exports = new RatingService();