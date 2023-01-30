import { Row } from "react-bootstrap";

import DeviceCard from "../deviceCard/DeviceCard";

const DeviceCardsList = ({ devicesList }) => {
  return devicesList.map(({ id, name, img, price, rating }) => (
    <DeviceCard
      key={id}
      id={id}
      img={img}
      name={name}
      price={price}
      rating={rating}
    />
  ));
};

const DeviceCatalog = ({ devices }) => {
  return (
    <Row className="d-flex">
      <DeviceCardsList devicesList={devices.rows} />
    </Row>
  );
};

export default DeviceCatalog;
