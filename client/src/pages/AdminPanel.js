import { Container } from "react-bootstrap/esm";

import TypeAddForm from "../components/admin/TypeAddForm";
import BrandAddForm from "../components/admin/BrandAddFrom";
import DeviceAddForm from "../components/admin/DeviceAddForm";

const AdminPanel = () => {
  return (
    <Container className="d-felx justify-content-center align-items-center mt-5">
      <TypeAddForm />
      <BrandAddForm />
      <DeviceAddForm />
    </Container>
  );
};

export default AdminPanel;
