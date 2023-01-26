import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Container, Col } from "react-bootstrap/esm";
import Row from "react-bootstrap/Row";

import TypeBar from "../components/typeBar/TypeBar";
import BrandBar from "../components/brandBar/BrandBar";
import DeviceCatalog from "../components/deviceCatalog/DeviceCatalog";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

const Catalog = () => {
  const data = useLoaderData();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={data}>
        {({ brands, types, devices }) => (
          <Container>
            <Row>
              <Col md={3}>
                <TypeBar types={types} />
              </Col>

              <Col md={9}>
                <BrandBar brands={brands} />
                <DeviceCatalog devices={devices} />
              </Col>
            </Row>
          </Container>
        )}
      </Await>
    </Suspense>
  );
};

export default Catalog;
