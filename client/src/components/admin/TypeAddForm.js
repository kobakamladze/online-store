import { Button } from "react-bootstrap/esm";
import { Form } from "react-bootstrap";
import { useState } from "react";

import { authHost } from "../../http";

const TypeAddForm = () => {
  const [typeName, setTypeName] = useState("");

  const handleTypeSubmit = (e) => {
    e.preventDefault();
    return authHost
      .post("/api/type", { name: typeName })
      .then(() => alert("Type added"))
      .catch((e) => alert(e.response.data.message));
  };

  return (
    <>
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
    </>
  );
};

export default TypeAddForm;
