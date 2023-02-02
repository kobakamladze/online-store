import { Row } from "react-bootstrap";

import DeviceCard from "../deviceCard/DeviceCard";

const DeviceCardsList = ({ devicesList }) => {
  return devicesList.map((device, idx) => (
    <DeviceCard key={idx} device={device} />
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
