import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { animated, useTransition } from "react-spring";

import CartItem from "../components/cartItem/CartItem";
import { useFetchCartItemsQuery } from "../store/slices/authApiSlice";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

const CartList = ({ data }) => {
  const transitions = useTransition(data, {
    key: item => item.id,
    from: { opacity: 1, translateX: "-1000px" },
    enter: { opacity: 1, translateX: "0" },
    leave: { opacity: 0, translateX: "1000px" },
  });

  return (
    <ul style={{ listStyle: "none" }}>
      {data.length ? (
        transitions((prop, deviceData) => (
          <animated.li style={prop}>
            <CartItem key={deviceData.id} deviceData={deviceData} />
          </animated.li>
        ))
      ) : (
        <div>
          <h3>Cart is empty</h3>
        </div>
      )}
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
