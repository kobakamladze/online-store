import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Container, Col } from "react-bootstrap/esm";
import Row from "react-bootstrap/Row";

import TypeBar from "../components/typeBar/TypeBar";
import BrandBar from "../components/brandBar/BrandBar";
import DeviceCatalog from "../components/deviceCatalog/DeviceCatalog";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import { fetchDevices } from "../http/deviceAPI";

// generates array of integers that are ids of passed list (e.g. brands, types...)
function generateFilterList(list = []) {
  if (!list.length) return [];
  return list.filter(({ active }) => active).map(({ id }) => id);
}

const Catalog = () => {
  const data = useLoaderData();
  const { brands, types, devices } = data;

  const [devicesData, setDevicesData] = useState(devices);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // states for filtering devices by chosen types and brands
  const [brandsButtonsList, setBrandsButtonsList] = useState(
    brands.map(({ name, id }) => ({ name, id, active: false }))
  );
  const [typesButtonsList, setTypesButtonsList] = useState(
    types.map(({ id, name }) => ({ id, name, active: false }))
  );

  const brandsButtonToggle = e => {
    setPage(1);
    setBrandsButtonsList(state => [
      ...state.map(button =>
        button.name === e.target.textContent
          ? { ...button, active: !button.active }
          : button
      ),
    ]);
  };

  const typesButtonToggle = e => {
    setPage(1);
    setTypesButtonsList(state => [
      ...state.map(button =>
        button.name === e.target.textContent
          ? { ...button, active: !button.active }
          : { ...button, active: false }
      ),
    ]);
  };

  // useEffect is being called on selecting brand, type or new next page
  useEffect(
    () => {
      setLoading(true);
      async function fetchFilteredDevices() {
        const brandIds = generateFilterList(brandsButtonsList);
        const typeId = typesButtonsList.find(type => type.active)?.id || "";

        const newDevicesData = await fetchDevices(brandIds, typeId, page);
        setDevicesData(state => ({ ...state, ...newDevicesData }));
        setLoading(false);
      }
      fetchFilteredDevices();
    },
    // eslint-disable-next-line
    [JSON.stringify(typesButtonsList), JSON.stringify(brandsButtonsList), page]
  );

  return (
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
          {loading ? (
            <LoadingSpinner />
          ) : (
            <DeviceCatalog
              devices={devicesData}
              loading={loading}
              page={page}
              setPage={setPage}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Catalog;
