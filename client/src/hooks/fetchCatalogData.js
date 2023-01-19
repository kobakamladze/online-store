import { host } from "../http";

function FetchCatalogData() {
  return Promise.allSettled([
    host.get("/api/type"),
    host.get("/api/brand"),
    host.get("/api/device"),
  ])
    .then(
      ([
        {
          value: { data: typesData },
        },
        {
          value: { data: brandsData },
        },
        {
          value: { data: devicesData },
        },
      ]) => {
        console.log(
          "FETCH DEVICES RESPONSE === " + JSON.stringify(devicesData)
        );
        return { typesData, brandsData, devicesData };
      }
    )
    .catch((e) => {
      console.log("ERROR === " + e);
      throw e;
    });
}

export default FetchCatalogData;
