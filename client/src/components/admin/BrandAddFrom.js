import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap/esm";
import { Form } from "react-bootstrap";

import { useAddBrandMutation } from "../../store/slices/authApiSlice";

const BrandAddForm = ({ types }) => {
  const [addBrand] = useAddBrandMutation();

  const [brandName, setBrandName] = useState("");
  const [chosenTypeForBrand, setChosenTypeForBrand] = useState({
    id: "",
    name: "",
  });

  const handleBrandSubmit = async e => {
    e.preventDefault();
    try {
      await addBrand({
        brandName,
        typeName: chosenTypeForBrand.name,
        typeId: chosenTypeForBrand.id,
      });

      alert("Brand added");
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <>
      <Form>
        <h3 className="my-2">Add brand:</h3>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter brand name"
            value={brandName}
            onChange={e => setBrandName(e.target.value.toLowerCase())}
          />
        </Form.Group>

        <Dropdown className="my-2">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {chosenTypeForBrand.name ? chosenTypeForBrand.name : "Choose type"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {types.map(({ name, id }) => (
              <Dropdown.Item
                key={id}
                id={id}
                onClick={e =>
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
          onClick={e => handleBrandSubmit(e)}
        >
          Submit
        </Button>
      </Form>

      <br />
    </>
  );
};

export default BrandAddForm;
