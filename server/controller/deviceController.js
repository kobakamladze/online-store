import ApiError from "../error/ApiError.js";
import { Device } from "../models/model.js";

class DeviceContorller {
  create(req, res, next) {
    console.log(JSON.stringify(req.body));
    const {
      deviceName: name,
      price,
      rating,
      imageURL: img,
      typeId,
      brandId,
    } = req.body;

    if (!name || !price || !typeId || !brandId)
      throw ApiError.badRequest("Invalid values");

    return Device.create({ name, price, rating, img, typeId, brandId })
      .then((response) => res.json(response))
      .catch((e) => next(ApiError.badRequest(e.message)));
  }

  getAll(req, res) {
    const { brandId, typeId, limit = 9, page = 1 } = req.query;

    let offset = page * limit - limit;

    let queryParams = { offset, limit };

    if (brandId && typeId)
      queryParams = { where: { brandId, typeId }, ...queryParams };

    if (brandId && !typeId)
      queryParams = { where: { brandId }, ...queryParams };

    if (!brandId && typeId) queryParams = { where: { typeId }, ...queryParams };

    return Device.findAndCountAll(queryParams).then((response) =>
      res.json(response)
    );
  }

  getOne(req, res) {
    const id = req.params.id;
    return Device.findOne({ where: { id } }).then((response) =>
      res.json(response)
    );
  }
}

export default new DeviceContorller();
