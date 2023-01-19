import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";

// const typesList = [{ name: "Phones" }, { name: "Refrigerators" }];

const TypeBar = () => {
  const { types } = useSelector((state) => state);

  const [buttonsList, setButtonsList] = useState(
    types.map(({ name }) => ({ name, active: false }))
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
