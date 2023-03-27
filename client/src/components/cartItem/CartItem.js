import { Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDeleteCartItemMutation } from "../../store/slices/authApiSlice";

const CartItem = ({ deviceData: { id, name, price, rating, img } }) => {
  const [deleteCartItem] = useDeleteCartItemMutation();

  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const removeDeviceFromCart = async (e, { userId, deviceId }) => {
    e.preventDefault();

    try {
      await deleteCartItem({ userId, deviceId });
    } catch (e) {
      return e;
    }
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center px-5 my-2 border w-100"
      style={{ margin: "1 rem 0" }}
    >
      <div>
        <Image src={img} style={{ height: "140px" }} />
      </div>
      <div className="d-flex align-items-center text-center">
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
            removeDeviceFromCart(e, { userId: user.id, deviceId: id })
          }
        >
          X
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
