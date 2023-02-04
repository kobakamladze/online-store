import ApiError from "../error/ApiError.js";
import { Brand, Type } from "../models/model.js";

class BrandContorller {
  create(req, res, next) {
    const { brandName, typeName, typeId } = req.body;

    if (!brandName || !typeName || !typeId)
      throw ApiError.badRequest("Invalid values");

    return Type.findOne({ where: { id: typeId, name: typeName } }).then(
      type => {
        if (!type) throw ApiError.badRequest("Such type was not found");

        return Brand.findOne({ where: { name: brandName } })
          .then(brand => {
            if (brand) throw ApiError.badRequest("Brand already exists");

            return Brand.create({ name: brandName, typeId });
          })
          .then(response => res.json(response))
          .catch(e => next(e))
          .finally();
      }
    );
  }

  getAll(req, res, next) {
    return Brand.findAll()
      .then(response => res.json(response))
      .catch(e => next(e))
      .finally();
  }

  getOne(req, res, next) {
    const id = req.params.id;

    if (!id) throw ApiError.badRequest("ID was not recieved");

    return Brand.findOne({ where: { id } })
      .then(response => res.json(response))
      .catch(e => next(e))
      .finally();
  }
}

export default new BrandContorller();
