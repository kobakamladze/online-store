import { Type } from "../models/model.js";

class TypeContorller {
  async create(req, res) {
    const { name } = req.body;

    return Type.create({ name }).then((response) => res.json(response));
  }

  async getAll(req, res) {
    return Type.findAll().then((response) => res.json(response));
  }

  async getOne(req, res) {
    const id = req.params.id;
    return Type.findOne({ where: { id } }).then((response) =>
      res.json(response)
    );
  }
}

export default new TypeContorller();
