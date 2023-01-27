import { host } from ".";

const fetchDevices = async (id = "") => {
  const data = await host
    .get(`/api/device/${id}`)
    .then(({ data }) => data)
    .catch((e) => console.log(e))
    .finally();

  return data;
};

export default fetchDevices;
