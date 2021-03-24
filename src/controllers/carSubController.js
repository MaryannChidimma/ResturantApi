const CarSubService = require("../services/carSubSevices");

class CarSubController {
  async create(req, res) {
    const result = await CarSubService.create(req.body);
    res.status(201).send(result);
  }

  async getAll(req, res) {
    const result = await CarSubService.getAll(req.body);
    res.status(200).send(result);
  }
  async getOne(req, res) {
    const result = await CarSubService.getOne(req.params.carSub_id);
    res.status(200).send(result);
  }

  async updateCarSub(req, res) {
    const result = await CarSubService.updateCarSub(req.params.carSub_id, req.body)
    res.status(200).send(result);
  }

  async deleteCarSub(req, res) {
    const result = await CarSubService.deleteCarSub(req.params.carSub_id)
    res.status(301).send(result)
  }


}


module.exports = new CarSubController();