import { Col, Container, Image, Button } from "react-bootstrap";

const aboutDevice = {
  cpu: "Snapdragon",
  camera: "40px",
  batter: "3200mah",
  screen: "7.4",
};

const DevicePage = ({ name }) => {
  return (
    <>
      <Container className="mt-4 d-flex justify-content-between">
        <Col md={8}>
          <Image height={500} src="DEVICE IMAGE" />
        </Col>
        <Col md={4} className="d-flex flex-column p-2">
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ fontSize: 50, padding: "1rem 0" }}>Iphone 14</h3>
            <p>Pice: 500$</p>
            <p>Raing: A</p>
          </div>
          <Button>Add to cart</Button>
        </Col>
      </Container>
      <Container>
        <Col md={10} className="m-auto mt-4">
          <h3 style={{ fontSize: 35, margin: 30 }}>System info:</h3>
          <ul>
            {Object.entries(aboutDevice).map(([property, value], idx) => (
              <li
                className="p-2 d-flex justify-content-between"
                style={idx % 2 ? null : { background: "grey", color: "white" }}
              >
                <div>{property}: </div>
                <div>{value}</div>
              </li>
            ))}
          </ul>
        </Col>
      </Container>
    </>
  );
};

export default DevicePage;
