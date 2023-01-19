import { Container, Col } from "react-bootstrap/esm";
import Row from "react-bootstrap/Row";

import TypeBar from "../components/typeBar/TypeBar";
import BrandBar from "../components/brandBar/BrandBar";
import DeviceCatalog from "../components/deviceCatalog/DeviceCatalog";

const Catalog = () => {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>

        <Col md={9}>
          <BrandBar />
          <DeviceCatalog />
        </Col>
      </Row>
    </Container>
  );
};

export default Catalog;
