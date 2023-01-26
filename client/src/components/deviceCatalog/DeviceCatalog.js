import { useState } from "react";
import { Row } from "react-bootstrap";

import DeviceCard from "../deviceCard/DeviceCard";

const DeviceCatalog = ({ devices }) => {
  const [devicesList, setDevicesList] = useState(
    devices.rows.map(({ id, name, price, rating }) => ({
      id,
      name,
      price,
      rating,
    }))
  );

  return (
    <Row className="d-flex">
      {devicesList.map(({ id, name, price, rating }) => (
        <DeviceCard
          key={id}
          id={id}
          name={name}
          price={price}
          rating={rating}
        />
      ))}
    </Row>
  );
};

export default DeviceCatalog;
