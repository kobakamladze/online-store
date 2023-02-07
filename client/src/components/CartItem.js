import { Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCartItem } from "../http/cartAPI";

const CartItem = ({ deviceData: { id, name, price, rating, img } }) => {
  const navigate = useNavigate();
  const { authorized } = useSelector(state => state);

  const removeDeviceFromCart = (e, { userId, deviceId }) => {
    e.preventDefault();
    return deleteCartItem({ userId, deviceId })
      .catch(e => console.log(e))
      .finally(() => navigate(0));
  };

  return (
    <li style={{ margin: "1 rem 0" }}>
      <div className="d-flex justify-content-between align-items-center px-5 my-2 border w-100">
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
      </div>
    </li>
  );
};

export default CartItem;
