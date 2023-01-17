import ApiError from "../error/ApiError.js";
import { Brand, Type } from "../models/model.js";

class BrandContorller {
  create(req, res, next) {
    console.log(JSON.stringify(req.body));

    const { brandName, typeName, typeId } = req.body;

    if (!brandName || !typeName || !typeId)
      throw ApiError.badRequest("Invalid values");

    console.log("BRAND NAME === " + brandName);
    console.log("TYPE NAME === " + typeName);
    console.log("TYPE ID === " + typeId);

    return Type.findOne({ where: { id: typeId, name: typeName } }).then(
      (type) => {
        console.log("RESPONSE TYPE === " + JSON.stringify(type));

        if (!type) throw ApiError.badRequest("Such type was not found");

        return Brand.findOne({ where: { name: brandName } })
          .then((brand) => {
            console.log("RESPONSE BRAND === " + JSON.stringify(brand));

            if (brand) throw ApiError.badRequest("Brand already exists");

            return Brand.create({ name: brandName, typeId });
          })
          .then((response) => res.json(response))
          .catch((e) => next(e));
      }
    );
  }

  getAll(req, res, next) {
    return Brand.findAll()
      .then((response) => res.json(response))
      .catch((e) => next(e));
  }

  getOne(req, res, next) {
    const id = req.params.id;

    if (!id) throw ApiError.badRequest("ID was not recieved");

    return Brand.findOne({ where: { id } })
      .then((response) => res.json(response))
      .catch((e) => next(e));
  }
}

export default new BrandContorller();
