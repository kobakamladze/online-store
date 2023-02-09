import { Op } from "sequelize";
import ApiError from "../error/ApiError.js";
import { Brand, Device, Type } from "../models/model.js";

class DeviceContorller {
  create(req, res, next) {
    const {
      deviceName: name,
      price,
      rating,
      info,
      imageURL: img,
      typeId,
      brandId,
    } = req.body;

    if (!name || !price || !typeId || !brandId)
      throw ApiError.badRequest("Invalid values");

    return Device.create({ name, price, rating, img, typeId, brandId, info })
      .then(response => res.json(response))
      .catch(e => next(ApiError.badRequest(e.message)))
      .finally();
  }

  getAll(req, res) {
    const { brandId, typeId, limit = 9, page = 1 } = req.query;

    const brandIdsList = brandId ? brandId.split(",") : null;
    const typeIdsList = typeId ? typeId.split(",") : null;

    let offset = page * limit - limit;
    let queryParams = {
      offset,
      limit,
      include: [{ model: Brand, attributes: ["name"] }],
    };

    if (brandId && typeId)
      queryParams = {
        where: {
          brandId: { [Op.or]: brandIdsList },
          typeId: { [Op.or]: typeIdsList },
        },
        ...queryParams,
      };

    if (brandId && !typeId)
      queryParams = {
        where: { brandId: { [Op.or]: brandIdsList } },
        ...queryParams,
      };

    if (!brandId && typeId)
      queryParams = {
        where: { typeId: { [Op.or]: typeIdsList } },
        ...queryParams,
      };

    return Device.findAndCountAll(queryParams)
      .then(response => res.json(response))
      .finally();
  }

  getOne(req, res) {
    const id = req.params.deviceId;
    return Device.findOne({
      where: { id },
      include: [
        { model: Brand, attributes: ["name"] },
        { model: Type, attributes: ["name"] },
      ],
    })
      .then(device => res.json(device))
      .finally();
  }
}

export default new DeviceContorller();
