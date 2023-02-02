import { host } from ".";

const fetchDevices = async (params = "") => {
  const data = await host
    .get(`/api/device${params}`)
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
