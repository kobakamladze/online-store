import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Container } from "react-bootstrap/esm";

import TypeAddForm from "../components/admin/TypeAddForm";
import BrandAddForm from "../components/admin/BrandAddFrom";
import DeviceAddForm from "../components/admin/DeviceAddForm";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

const AdminPanel = () => {
  const data = useLoaderData();
  const { brands, types } = data;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={data}>
        <Container className="d-felx justify-content-center align-items-center mt-5">
          <TypeAddForm />
          <BrandAddForm types={types} />
          <DeviceAddForm brands={brands} types={types} />
        </Container>
      </Await>
    </Suspense>
  );
};

export default AdminPanel;
