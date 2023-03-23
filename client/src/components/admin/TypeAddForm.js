import { Button } from "react-bootstrap/esm";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { useAddTypeMutation } from "../../store/slices/authApiSlice";

const TypeAddForm = () => {
  const [addType] = useAddTypeMutation();

  const [typeName, setTypeName] = useState("");

  const handleTypeSubmit = async e => {
    e.preventDefault();

    try {
      await addType({ name: typeName });
      alert("Type added");
    } catch (e) {
      alert(e.response.data.message);
    }
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
            onChange={e => setTypeName(e.target.value.toLowerCase())}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={e => handleTypeSubmit(e, typeName)}
        >
          Submit
        </Button>
      </Form>

      <br />
    </>
  );
};

export default TypeAddForm;
