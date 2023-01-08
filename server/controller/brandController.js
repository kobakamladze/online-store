import { Brand } from "../models/model.js";

class BrandContorller {
  async create(req, res) {
    const { name } = req.body;

    return Brand.create({ name }).then((response) => res.json(response));
  }

  async getAll(req, res) {
    return Brand.findAll().then((response) => res.json(response));
  }

  async getOne(req, res) {
    const id = req.params.id;
    return Brand.findOne({ where: { id } }).then((response) =>
      res.json(response)
    );
  }
}

export default new BrandContorller();
