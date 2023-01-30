import { Suspense } from "react";
import { Col, Container, Image, Button } from "react-bootstrap";
import { Await, useLoaderData } from "react-router-dom";

import notfound from "../assets/notfound.jfif";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

const GenerateDeviceInfoList = ({ props: info }) => {
  if (!info)
    return (
      <>
        <Col
          md={10}
          className="m-auto mt-4 d-flex justify-content-center align-items-center"
        >
          <h3 style={{ fontSize: 35, margin: 30 }}>
            No details for this device
          </h3>
        </Col>
      </>
    );

  return (
    <>
      <Col md={10} className="m-auto mt-4">
        <h3 style={{ fontSize: 35, margin: 30 }}>System info:</h3>
        <ul>
          {Object.entries(info).map(([property, value], idx) => (
            <li
              className="p-2 d-flex justify-content-between"
              key={idx}
              style={idx % 2 ? null : { background: "grey", color: "white" }}
            >
              <div>{property}: </div>
              <div>{value}</div>
            </li>
          ))}
        </ul>
      </Col>
    </>
  );
};

const DevicePage = () => {
  const data = useLoaderData();

  console.log(data);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={data}>
        {({ name, price, img, rating }) => {
          return (
            <>
              <Container className="mt-4 d-flex justify-content-between">
                <Col md={6} className="d-flex justify-content-center">
                  <Image height={500} src={img} alt={notfound} />
                </Col>
                <Col md={6} className="d-flex flex-column p-2">
                  <div style={{ marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: 50, padding: "1rem 0" }}>{name}</h3>
                    <p>Price: {`${price}$`}</p>
                    <p>Rating: {rating}</p>
                  </div>
                  <Button>Add to cart</Button>
                </Col>
              </Container>
              <Container>
                <GenerateDeviceInfoList props={data.info} />
              </Container>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default DevicePage;
