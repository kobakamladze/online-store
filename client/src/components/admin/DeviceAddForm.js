import { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap/esm";
import { Form } from "react-bootstrap";

import { authHost, host } from "../../http";

const DeviceAddForm = () => {
  const [typesList, setTypesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);

  const [deviceName, setDeviceName] = useState("");
  const [devicePrice, setDevicePrice] = useState(0);
  const [deviceImageURL, setDeviceImageURL] = useState("");

  const [chosenType, setChosenType] = useState({
    id: "",
    name: "",
  });
  const [chosenBrand, setChosenBrand] = useState({ id: "", name: "" });

  // eslint-disable-next-line
  useEffect(async () => {
    const { data: typesData } = await host.get("/api/type");
    const { data: typesBrand } = await host.get("/api/brand");
    await setBrandsList(typesData);
    await setTypesList(typesBrand);
  }, []);

  const handleDeviceSubmit = (e) => {
    e.preventDefault();
    return authHost
      .post("/api/device", {
        deviceName,
        price: devicePrice,
        imageURL: deviceImageURL,
        typeId: chosenType.id,
        brandId: chosenBrand.id,
      })
      .then(() => alert("Device added"))
      .catch((e) => alert(e.response.data.message));
  };

  return (
    <>
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
            {chosenType.name ? chosenType.name : "Choose type"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {typesList.map(({ name, id }) => (
              <Dropdown.Item
                key={id}
                id={id}
                onClick={(e) =>
                  setChosenType(() => ({
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
    </>
  );
};

export default DeviceAddForm;
