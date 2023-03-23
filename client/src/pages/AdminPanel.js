import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Container } from "react-bootstrap/esm";

import TypeAddForm from "../components/admin/TypeAddForm";
import BrandAddForm from "../components/admin/BrandAddFrom";
import DeviceAddForm from "../components/admin/DeviceAddForm";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import { useGetBrandsQuery, useGetTypesQuery } from "../store/slices/apiSlice";

const AdminPanel = () => {
  const data = useLoaderData();

  const { data: brands, isLoading: brandsIsLoading } = useGetBrandsQuery();
  const { data: types, isLoading: typesIsloading } = useGetTypesQuery();

  if (brandsIsLoading || typesIsloading) return <LoadingSpinner />;

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
