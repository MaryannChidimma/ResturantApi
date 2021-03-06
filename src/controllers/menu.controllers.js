const { BadRequestError } = require('../../lib/appError');
const menuService = require('../services/menu.service')
const appResponse = require('../../lib/appResponse')
const { singleUpload } = require('../../lib/cloudinary')
class MenuController {
    async create(req, res) {

        const data = { ...req.body, }
        if (req.file) {
            const image = await singleUpload(req.file)
            if (!image) throw new BadRequestError("image upload failed")
            data.image = image
        }
        const menu = await menuService.create(data);
        res.send(appResponse("menu created successfully", menu));
    }

    async getAll(req, res) {
        const menu = await menuService.find(req.query);
        res.send(appResponse("All menus", menu))
    }

    async getOne(req, res) {
        const data = await menuService.getOne(req.query.id);
        res.send(appResponse("Menu details gotten successfully", data))
    }

    async getPopular(req, res) {
        const data = await menuService.getPopular(req.query);
        res.send(appResponse("Popular menu gotten successfully", data))
    }
    async getSpecial(req, res) {
        const data = await menuService.getSpecial(req.query);
        res.send(appResponse("Special menu gotten successfully", data))
    }
    async update(req, res) {
        const data = { ...req.body }

        if (req.file) {
            let fileUpload = await singleUpload(req.file)

            if (!fileUpload) throw new BadRequestError("image uplaod failed")
            console.log(fileUpload)

            data.image = fileUpload

        }

        const menu = await menuService.update(req.query.id, data)

        res.send(appResponse("categoryupdated successfully", menu))
    }

    async ratings(req, res) {
        const { menuId, rating } = req.body

        const menu = await menuService.getOne(menuId)

        const noOfRating = menu.noOfRating + 1
        const averageRating = menuService.rateMenu(Number(rating), menu.rating, menu.noOfRating, noOfRating)

        await menuService.update(menuId, { rating: averageRating, noOfRating })

        res.send(appResponse("menu rated successfully"))

    }

    async delete(req, res) {
        await menuService.delete(req.query.id);
        res.send(appResponse("menu deleted successfully"));
    }
}


module.exports = new MenuController()