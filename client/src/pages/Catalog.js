import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Container, Col } from "react-bootstrap/esm";
import Row from "react-bootstrap/Row";

import TypeBar from "../components/typeBar/TypeBar";
import BrandBar from "../components/brandBar/BrandBar";
import DeviceCatalog from "../components/deviceCatalog/DeviceCatalog";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import { fetchDevices } from "../http/deviceAPI";
import {
  useGetBrandsQuery,
  useGetDevicesQuery,
  useGetTypesQuery,
} from "../store/slices/apiSlice";

const Catalog = () => {
  const [activeTypes, setActiveTypes] = useState([]);
  const [activeBrands, setActiveBrands] = useState([]);
  const [page, setPage] = useState(1);

  const {
    data: devices,
    error: devicesError,
    isLoading: devicesIsLoading,
  } = useGetDevicesQuery({ brandId: activeBrands, typeId: activeTypes, page });

  const {
    data: brands,
    error: brandsError,
    isLoading: brandsIsLoading,
  } = useGetBrandsQuery();

  const {
    data: types,
    error: typesError,
    isLoading: typesIsLoading,
  } = useGetTypesQuery();

  const brandsButtonToggle = e => {
    setPage(1);

    const id = e.target.getAttribute("data-id");
    const idIsActive = activeBrands.includes(id);

    if (idIsActive)
      return setActiveBrands(state => [
        ...state.filter(activeId => activeId !== id),
      ]);

    setActiveBrands(state => [...state, id]);
  };

  const typesButtonToggle = e => {
    setPage(1);

    const id = e.target.getAttribute("data-id");
    const idIsActive = activeTypes.includes(id);

    if (idIsActive)
      return setActiveTypes(state => [
        ...state.filter(activeId => activeId !== id),
      ]);

    setActiveTypes(state => [...state, id]);
  };

  if (typesIsLoading || brandsIsLoading || devicesIsLoading)
    return <LoadingSpinner />;

  return (
    <Container>
      <Row>
        <Col md={3}>
          <TypeBar
            typesButtonsList={types.map(type =>
              activeTypes.includes(`${type.id}`)
                ? { ...type, active: true }
                : { ...type, active: false }
            )}
            typesButtonToggle={typesButtonToggle}
          />
        </Col>

        <Col md={9}>
          <BrandBar
            brandsButtonsList={brands.map(brand =>
              activeBrands.includes(`${brand.id}`)
                ? { ...brand, active: true }
                : { ...brand, active: false }
            )}
            brandsButtonToggle={brandsButtonToggle}
          />
          <DeviceCatalog devices={devices} page={page} setPage={setPage} />
        </Col>
      </Row>
    </Container>
  );
};

export default Catalog;
