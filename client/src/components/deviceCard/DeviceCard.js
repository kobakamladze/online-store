import { Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import notfound from "../../assets/notfound.jfif";
import star from "../../assets/star.png";

const DeviceCard = ({ id, name, img, price, rating }) => {
  return (
    <Col md={3}>
      <Link to={`/device/${id}`}>
        <Card className="mt-3 p-2">
          <Image src={img} alt={notfound} height={180} />
          <div className="d-flex justify-content-between align-items-center">
            <div>DEVICE_BRAND</div>
            <div className="text-black-50 mt-3 d-flex align-items-center">
              <div>{rating || 5}</div>
              <Image src={star} height={25} alt="rating" />
            </div>
          </div>
          <div>{name}</div>
          <div>{`${price} $`}</div>
        </Card>
      </Link>
    </Col>
  );
};

export default DeviceCard;
