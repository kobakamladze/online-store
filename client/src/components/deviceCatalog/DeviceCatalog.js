import { Row } from "react-bootstrap";
import DeviceCard from "../deviceCard/DeviceCard";

const a = [
  { name: "Phone" },
  { name: "Phone" },
  { name: "Phone" },
  { name: "Phone" },
  { name: "Phone" },
  { name: "Phone" },
  { name: "Phone" },
  { name: "Phone" },
  { name: "Phone" },
  { name: "Phone" },
  { name: "Phone" },
  { name: "Phone" },
];

const DeviceCatalog = () => {
  return (
    <Row className="d-flex">
      {a.map(({ name }, idx) => (
        <DeviceCard key={idx} id={idx} name={name} />
      ))}
    </Row>
  );
};

export default DeviceCatalog;
