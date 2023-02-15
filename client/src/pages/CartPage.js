import { Suspense } from "react";
import { Container } from "react-bootstrap";
import { Await, useLoaderData } from "react-router-dom";

import CartItem from "../components/cartItem/CartItem";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

const CartList = ({ data }) => {
  if (!data.length)
    return (
      <div>
        <h3>Cart is empty</h3>
      </div>
    );

  return (
    <ul style={{ listStyle: "none" }}>
      {data.map(deviceData => (
        <CartItem key={deviceData.id} deviceData={deviceData} />
      ))}
    </ul>
  );
};

const CartPage = () => {
  const data = useLoaderData();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={data}>
        <Container>
          <CartList data={data} />
        </Container>
      </Await>
    </Suspense>
  );
};

export default CartPage;
