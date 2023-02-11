import { useContext } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";

import { deleteCartItem } from "../http/cartAPI";
import { AuthorizedContext } from "./app/App";

const CartItem = ({ deviceData: { id, name, price, rating, img } }) => {
  const navigate = useNavigate();
  const [authorized] = useContext(AuthorizedContext);
  const mountStyle = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });

  const removeDeviceFromCart = (e, { userId, deviceId }) => {
    e.preventDefault();
    return deleteCartItem({ userId, deviceId })
      .catch(e => console.log(e))
      .finally(() => navigate(0));
  };

  return (
    <li style={{ margin: "1 rem 0" }}>
      <animated.div
        className="d-flex justify-content-between align-items-center px-5 my-2 border w-100"
        style={{ ...mountStyle }}
      >
        <div>
          <Image src={img} style={{ height: "140px" }} />
        </div>
        <div className="d-flex align-items-center">
          <div>
            <h4
              style={{ textTransform: "capitalize", cursor: "pointer" }}
              onClick={() => navigate(`/device/${id}`)}
            >
              {name}
            </h4>
            <p style={{ fontSize: "22px", fontWeight: 600 }}>{`$${price}`}</p>
          </div>
        </div>
        <div>
          <Button
            variant="danger"
            onClick={e =>
              removeDeviceFromCart(e, { userId: authorized.id, deviceId: id })
            }
          >
            X
          </Button>
        </div>
      </animated.div>
    </li>
  );
};

export default CartItem;
