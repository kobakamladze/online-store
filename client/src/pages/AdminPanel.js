import { Container, Button, Dropdown } from "react-bootstrap/esm";
import { Form } from "react-bootstrap";

import { useEffect, useState } from "react";
import { authHost, host } from "../http";

const AdminPanel = () => {
  const [brandName, setBrandName] = useState("");
  const [typeName, setTypeName] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [devicePrice, setDevicePrice] = useState(0);
  const [deviceImageURL, setDeviceImageURL] = useState("");

  const [typesList, setTypesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);

  const [chosenTypeForBrand, setChosenTypeForBrand] = useState({
    id: "",
    name: "",
  });
  const [chosenTypeForDevice, setChosenTypeForDevice] = useState({
    id: "",
    name: "",
  });
  const [chosenBrand, setChosenBrand] = useState({ id: "", name: "" });

  useEffect(
    () =>
      Promise.all([host.get("/api/type"), host.get("/api/brand")]).then(
        ([{ data: typesListResponse }, { data: brandsListResponse }]) => {
          setBrandsList(brandsListResponse);
          setTypesList(typesListResponse);
        }
      ),
    []
  );

  const handleTypeSubmit = (e) => {
    e.preventDefault();
    return authHost
      .post("/api/type", { name: typeName })
      .then(() => alert("Type added"))
      .catch((e) => alert(e.response.data.message));
  };

  const handleBrandSubmit = (e) => {
    e.preventDefault();
    return authHost
      .post("/api/brand", {
        brandName,
        typeName: chosenTypeForBrand.name,
        typeId: chosenTypeForBrand.id,
      })
      .then(() => alert("Brand added"))
      .catch((e) => alert(e.response.data.message));
  };

  const handleDeviceSubmit = (e) => {
    e.preventDefault();
    return authHost
      .post("/api/device", {
        deviceName,
        price: devicePrice,
        imageURL: deviceImageURL,
        typeId: chosenTypeForDevice.id,
        brandId: chosenBrand.id,
      })
      .then(() => alert("Device added"))
      .catch((e) => alert(e.response.data.message));
  };

  return (
    <Container className="d-felx justify-content-center align-items-center mt-5">
      <Form>
        <h3 className="my-2">Add type:</h3>
        <Form.Group className="my-2">
          <Form.Control
            type="text"
            placeholder="Enter type name"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value.toLowerCase())}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleTypeSubmit(e, typeName)}
        >
          Submit
        </Button>
      </Form>

      <br />

      <Form>
        <h3 className="my-2">Add brand:</h3>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter brand name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value.toLowerCase())}
          />
        </Form.Group>

        <Dropdown className="my-2">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {chosenTypeForBrand.name ? chosenTypeForBrand.name : "Choose type"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {typesList.map(({ name, id }) => (
              <Dropdown.Item
                key={id}
                id={id}
                onClick={(e) =>
                  setChosenTypeForBrand(() => ({
                    id,
                    name: e.target.textContent,
                  }))
                }
              >
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleBrandSubmit(e)}
        >
          Submit
        </Button>
      </Form>

      <br />

      <Form>
        <h3 className="my-2">Add device:</h3>
        <Form.Group>
          <Form.Control
            className="my-2"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value.toLowerCase())}
            type="text"
            placeholder="Device name"
          />

          <Form.Control
            className="my-2"
            value={devicePrice}
            onChange={(e) => setDevicePrice(e.target.value)}
            type="number"
            placeholder="Price"
          />

          <Form.Control
            className="my-2"
            value={deviceImageURL}
            onChange={(e) => setDeviceImageURL(e.target.value)}
            type="text"
            placeholder="Image URL"
          />
        </Form.Group>

        <Dropdown className="my-2">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {chosenTypeForDevice.name
              ? chosenTypeForDevice.name
              : "Choose type"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {typesList.map(({ name, id }) => (
              <Dropdown.Item
                key={id}
                id={id}
                onClick={(e) =>
                  setChosenTypeForDevice(() => ({
                    id,
                    name: e.target.textContent,
                  }))
                }
              >
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="my-2">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {chosenBrand.name ? chosenBrand.name : "Choose brand"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {brandsList.map(({ name, id }) => (
              <Dropdown.Item
                key={id}
                id={id}
                onClick={(e) =>
                  setChosenBrand(() => ({
                    id,
                    name: e.target.textContent,
                  }))
                }
              >
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Button
          onClick={(e) => handleDeviceSubmit(e)}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AdminPanel;
