import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Container, Col } from "react-bootstrap/esm";
import Row from "react-bootstrap/Row";

import TypeBar from "../components/typeBar/TypeBar";
import BrandBar from "../components/brandBar/BrandBar";
import DeviceCatalog from "../components/deviceCatalog/DeviceCatalog";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

// filters devices by typeId or brandId if none of these was provided returns unchanged object of devices
function filterDevices({ brandIdsList = [], typeIdsList = [], devices }) {
  let count;
  let rows;

  if (!brandIdsList.length && !typeIdsList.length) return devices;

  if (brandIdsList.length && typeIdsList.length) {
    const filteredData = devices.rows.filter(
      device =>
        brandIdsList.includes(device.brandId) &&
        typeIdsList.includes(device.typeId)
    );

    rows = filteredData;
    count = filteredData.length;
  }

  if (brandIdsList.length) {
    const filteredData = devices.rows.filter(device =>
      brandIdsList.includes(device.brandId)
    );

    rows = filteredData;
    count = filteredData.length;
  }

  if (typeIdsList.length) {
    const filteredData = devices.rows.filter(device =>
      typeIdsList.includes(device.typeId)
    );

    rows = filteredData;
    count = filteredData.length;
  }

  return { count, rows };
}

// generates array of integers that are ids of passed list (e.g. brands, types...)
function createListOfActiveFilterOptions(list = []) {
  if (!list.length) return [];
  return list.filter(({ active }) => active).map(({ id }) => id);
}

const Catalog = () => {
  // Recieving data from server (brands, types, devices)
  const data = useLoaderData();
  const { brands, types, devices } = data;

  // states for filtering devices by chosen types and brands
  // const [devicesToDisplay, setDevicesToDisplay] = useState(devices.rows);
  const [brandsButtonsList, setBrandsButtonsList] = useState(
    brands.map(({ name, id }) => ({ name, id, active: false }))
  );
  const [typesButtonsList, setTypesButtonsList] = useState(
    types.map(({ id, name }) => ({ id, name, active: false }))
  );

  const brandsButtonToggle = e =>
    setBrandsButtonsList(state => [
      ...state.map(button =>
        button.name === e.target.textContent
          ? { ...button, active: !button.active }
          : button
      ),
    ]);

  const typesButtonToggle = e =>
    setTypesButtonsList(state => [
      ...state.map(button =>
        button.name === e.target.textContent
          ? { ...button, active: !button.active }
          : { ...button, active: false }
      ),
    ]);

  console.log(
    filterDevices({
      brandIdsList: createListOfActiveFilterOptions(brandsButtonsList),
      typeIdsList: createListOfActiveFilterOptions(typesButtonsList),
      devices,
    })
  );

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={data}>
        {() => (
          <Container>
            <Row>
              <Col md={3}>
                <TypeBar
                  typesButtonsList={typesButtonsList}
                  typesButtonToggle={typesButtonToggle}
                />
              </Col>

              <Col md={9}>
                <BrandBar
                  brandsButtonsList={brandsButtonsList}
                  brandsButtonToggle={brandsButtonToggle}
                />
                <DeviceCatalog
                  devices={filterDevices({
                    brandIdsList:
                      createListOfActiveFilterOptions(brandsButtonsList),
                    typeIdsList:
                      createListOfActiveFilterOptions(typesButtonsList),
                    devices,
                  })}
                />
              </Col>
            </Row>
          </Container>
        )}
      </Await>
    </Suspense>
  );
};

export default Catalog;
