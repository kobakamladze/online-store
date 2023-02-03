import { host } from ".";

const fetchDevices = async (brandIds = [], typeId = "", page = 1) => {
  const paramsObj = {};

  if (brandIds.length) paramsObj.brandId = brandIds.join(",");
  if (typeId) paramsObj.typeId = typeId;
  if (page > 1) paramsObj.page = page;

  const searchParams = `?${new URLSearchParams(paramsObj).toString()}`;

  const data = await host
    .get(`/api/device${searchParams}`)
    .then(({ data }) => data)
    .catch(e => console.log(e))
    .finally();

  return data;
};

const fetchDevice = async id => {
  const data = await host
    .get(`/api/device/${id}`)
    .then(({ data }) => data)
    .catch(e => console.log(e))
    .finally();

  return data;
};

export { fetchDevices, fetchDevice };
