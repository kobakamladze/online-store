import { host } from ".";

const fetchBrands = async () => {
  const data = await host
    .get("/api/brand")
    .then(({ data }) => data)
    .catch((e) => console.log(e))
    .finally();

  return data;
};

export default fetchBrands;
