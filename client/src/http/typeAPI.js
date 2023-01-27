import { host } from ".";

const fetchTypes = async () => {
  const data = await host
    .get("/api/type")
    .then(({ data }) => data)
    .catch((e) => console.log(e))
    .finally();

  return data;
};

export default fetchTypes;
