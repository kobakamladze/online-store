import { Cart, CartDevice, Device } from "../models/model.js";

class CartController {
  add(req, res, next) {
    const deviceId = parseInt(req.params.deviceId);
    const userId = parseInt(req.body.userId);

    return Cart.findOne({
      where: { userId },
      include: [{ model: CartDevice, include: [{ model: Device }] }],
    })
      .then(cart => {
        // check if device is already added to users container
        const deviceAlreadyBeenAddedToCard = cart["cart_devices"]
          .map(({ device }) => device)
          .some(cartDevice => cartDevice.id === deviceId);

        if (deviceAlreadyBeenAddedToCard)
          throw next("Device already added to cart");
        return CartDevice.create({ deviceId, cartId: cart.id });
      })
      .then(response => res.json(response))
      .catch(e => next(e))
      .finally();
  }

  getAll(req, res, next) {
    const userId = req.params.userId;

    return Cart.findAll({
      where: { userId: parseInt(userId) },
      include: { model: CartDevice, include: Device },
    })
      .then(response => {
        const [{ cart_devices }] = response;
        const cartDevicesList = cart_devices.map(({ device }) => device);
        res.json(cartDevicesList);
      })
      .catch(e => next(e))
      .finally();
  }

  delete(req, res, next) {
    const userId = req.body.userId;
    const deviceId = req.params.deviceId;

    return Cart.findOne({ where: { userId } })
      .then(({ id }) =>
        CartDevice.destroy({
          where: { cartId: id, deviceId: parseInt(deviceId) },
        })
      )
      .then(response => res.json(response))
      .catch(e => next(e))
      .finally();
  }
}

export default new CartController();
