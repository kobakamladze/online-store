import { authHost } from ".";

const fetchCartItems = async userId => {
  const data = await authHost
    .get(`/api/cart/${userId}`)
    .then(({ data }) => data)
    .catch(e => console.log(e))
    .finally();

  return data;
};

const deleteCartItem = async ({ userId, deviceId }) => {
  const data = await authHost
    .delete(`/api/cart/delete/${deviceId}`, { data: { userId } })
    .then(({ data }) => data)
    .catch(e => console.log(e))
    .finally();

  return data;
};

const addItemToCart = async ({ userId, deviceId }) => {
  const data = await authHost
    .post(`/api/cart/add/${deviceId}`, { userId })
    .then(({ data }) => data)
    .catch(e => console.log(e))
    .finally();

  return data;
};

export { fetchCartItems, deleteCartItem, addItemToCart };
