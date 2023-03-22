import { Suspense } from "react";
import { Col, Container, Image, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";

import notfound from "../assets/notfound.jfif";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import { addItemToCart } from "../http/cartAPI";

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
  const { data } = useLoaderData();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const mountStyle = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });

  const handleAddToCart = (e, { userId, deviceId }) => {
    e.preventDefault();
    if (!userId && !deviceId) navigate(`/login`);
    return addItemToCart({ userId, deviceId })
      .catch(e => console.log(e))
      .finally(() => navigate(`/cart/${userId}`));
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={data}>
        {({
          id,
          name,
          price,
          img,
          rating,
          info,
          brand: { name: brandName },
          type: { name: typeName },
        }) => (
          <animated.div style={mountStyle}>
            <Container className="mt-4 d-flex justify-content-between">
              <Col md={6} className="d-flex justify-content-center">
                <Image height={500} src={img} alt={notfound} />
              </Col>
              <Col md={6} className="d-flex flex-column p-2">
                <div style={{ marginBottom: "1rem" }}>
                  <h3
                    style={{
                      fontSize: 50,
                      padding: "1rem 0",
                      textTransform: "capitalize",
                    }}
                  >
                    {name}
                  </h3>
                  <p>Type: {typeName}</p>
                  <p>Brand: {brandName}</p>
                  <p>Rating: {rating}</p>
                  <p
                    style={{
                      fontSize: "30px",
                      fontWeight: 700,
                    }}
                  >{`$ ${price}`}</p>
                </div>
                <Button
                  onClick={e =>
                    handleAddToCart(e, { userId: user.id, deviceId: id })
                  }
                >
                  Add to cart
                </Button>
              </Col>
            </Container>
            <Container>
              <GenerateDeviceInfoList props={info} />
            </Container>
          </animated.div>
        )}
      </Await>
    </Suspense>
  );
};

export default DevicePage;
