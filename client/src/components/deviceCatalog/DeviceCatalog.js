import { useState } from "react";
import { Row } from "react-bootstrap";

import DeviceCard from "../deviceCard/DeviceCard";

const DeviceCatalog = ({ devices }) => {
  console.log(JSON.stringify(devices));

  const [devicesList, setDevicesList] = useState(
    devices.rows.map(({ id, name, img, price, rating }) => ({
      id,
      name,
      img,
      price,
      rating,
    }))
  );

  return (
    <Row className="d-flex">
      {devicesList.map(({ id, name, img, price, rating }) => (
        <DeviceCard
          key={id}
          id={id}
          img={img}
          name={name}
          price={price}
          rating={rating}
        />
      ))}
    </Row>
  );
};

export default DeviceCatalog;
