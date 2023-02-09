import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import notfound from "../../assets/notfound.jfif";
import star from "../../assets/star.png";

const DeviceCard = ({
  device: {
    id,
    name,
    img,
    price,
    rating,
    brand: { name: brandName },
  },
}) => {
  const navigate = useNavigate();

  const handleCardNavigate = () => navigate(`/device/${id}`);

  return (
    <Col md={3}>
      <div
        style={{ cursor: "pointer", margin: "0.8rem 0" }}
        onClick={handleCardNavigate}
      >
        <Card className="mt-3 p-2">
          <Image
            src={img}
            alt={notfound}
            height={180}
            style={{ objectFit: "contain" }}
          />
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                opacity: "0.6",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {brandName}
            </p>
            <div className="text-black-50 d-flex align-items-center">
              <div>{rating || 5}</div>
              <Image src={star} height={25} alt="rating" />
            </div>
          </div>

          <>
            <p>{name}</p>
            <p
              style={{ fontWeight: 600, padding: 0, margin: 0 }}
            >{`Price: $${price}`}</p>
          </>
        </Card>
      </div>
    </Col>
  );
};

export default DeviceCard;
