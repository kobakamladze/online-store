import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import CartItem from "../components/cartItem/CartItem";
import { useFetchCartItemsQuery } from "../store/slices/authApiSlice";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

const CartList = ({ data }) => {
  if (!data?.length)
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
  const userId = useSelector(state => state.user.id);
  const { data, isLoading } = useFetchCartItemsQuery(userId);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <CartList data={data} />
    </Container>
  );
};

export default CartPage;
