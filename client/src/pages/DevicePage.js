import { Suspense } from "react";
import { Col, Container, Image, Button } from "react-bootstrap";
import { Await, useLoaderData } from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

const aboutDevice = {
  cpu: "Snapdragon",
  camera: "40px",
  batter: "3200mah",
  screen: "7.4",
};

const DevicePage = () => {
  const data = useLoaderData();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={data}>
        {({ name, price }) => {
          return (
            <>
              <Container className="mt-4 d-flex justify-content-between">
                <Col md={8}>
                  <Image height={500} src="DEVICE IMAGE" />
                </Col>
                <Col md={4} className="d-flex flex-column p-2">
                  <div style={{ marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: 50, padding: "1rem 0" }}>{name}</h3>
                    <p>Price: {`${price}$`}</p>
                    <p>Raing: A</p>
                  </div>
                  <Button>Add to cart</Button>
                </Col>
              </Container>
              <Container>
                <Col md={10} className="m-auto mt-4">
                  <h3 style={{ fontSize: 35, margin: 30 }}>System info:</h3>
                  <ul>
                    {Object.entries(aboutDevice).map(
                      ([property, value], idx) => (
                        <li
                          className="p-2 d-flex justify-content-between"
                          key={idx}
                          style={
                            idx % 2
                              ? null
                              : { background: "grey", color: "white" }
                          }
                        >
                          <div>{property}: </div>
                          <div>{value}</div>
                        </li>
                      )
                    )}
                  </ul>
                </Col>
              </Container>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default DevicePage;
