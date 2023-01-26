import { useState } from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap/esm";
import { Form } from "react-bootstrap";

import { authHost } from "../../http";

const DeviceAddForm = ({ types, brands }) => {
  // main fields
  const [deviceName, setDeviceName] = useState("");
  const [devicePrice, setDevicePrice] = useState(0);
  const [deviceImageURL, setDeviceImageURL] = useState("");

  // for dropdown lists
  const [chosenType, setChosenType] = useState({
    id: "",
    name: "",
  });
  const [chosenBrand, setChosenBrand] = useState({ id: "", name: "" });

  // device description
  const [info, setInfo] = useState([]);

  const addDescriptionField = (e) =>
    setInfo((state) => [
      ...state,
      { propertyName: "", propertyValue: "", id: crypto.randomUUID() },
    ]);

  const deleteDescriptionField = (recievedId) =>
    setInfo((state) => [...state.filter(({ id }) => id !== recievedId)]);

  const addValueToDescriptionField = (e, recievedId) =>
    setInfo((state) => [
      ...state.map((field) =>
        field.id === recievedId
          ? { ...field, [e.target.name]: e.target.value }
          : field
      ),
    ]);

  // handler - submiter function
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
            {types.map(({ name, id }) => (
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
            {brands.map(({ name, id }) => (
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

        <div className="py-1 my-2" style={{ border: "1px black" }}>
          <Button onClick={addDescriptionField}>Add description row</Button>
          {info.map((object, i) => (
            <Row key={object.id} className="my-2">
              <Col md={4}>
                <Form.Control
                  name="propertyName"
                  placeholder="Enter property name"
                  onChange={(e) => addValueToDescriptionField(e, object.id)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  name="propertyValue"
                  placeholder="Enter value"
                  onChange={(e) => addValueToDescriptionField(e, object.id)}
                />
              </Col>
              <Col md={4}>
                <Button
                  variant="outline-danger"
                  onClick={() => deleteDescriptionField(object.id)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </div>

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
