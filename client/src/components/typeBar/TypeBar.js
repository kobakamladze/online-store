import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

const typesList = [{ name: "Phones" }, { name: "Refrigerators" }];

const TypeBar = () => {
  const [buttonsList, setButtonsList] = useState(
    typesList.map(({ name }) => ({ name, active: false }))
  );

  const handleActiveButton = (e) =>
    setButtonsList((state) => [
      ...state.map((button) =>
        button.name === e.target.textContent
          ? { ...button, active: !button.active }
          : { ...button, active: false }
      ),
    ]);

  return (
    <ListGroup>
      {buttonsList.map(({ name, active }, index) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          variant={active ? "secondary" : "outline-scondary"}
          key={index}
          onClick={handleActiveButton}
        >
          {name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TypeBar;
