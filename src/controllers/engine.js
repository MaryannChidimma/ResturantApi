const EngineService = require("../services/engine");

class EngineController {
  async create(req, res) {
    const result = await EngineService.create(req.body);
    res.status(201).send(result);
  }

  async getAll(req, res) {
    const result = await EngineService.getAll(req.body);
    res.status(200).send(result);
  }
  async getOne(req, res) {
    const result = await EngineService.getOne(req.params.engineId);
    res.status(200).send(result);
  }

  async updateEngine(req, res) {
    const result = await EngineService.updateCarSub(req.params.engineId, req.body)
    res.status(200).send(result);
  }

  async deleteEngine(req, res) {
    const result = await EngineService.deleteCarSub(req.params.engineId)
    res.status(301).send(result)
  }

}

module.exports = new EngineController();