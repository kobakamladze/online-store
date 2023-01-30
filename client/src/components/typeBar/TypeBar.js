import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = ({ typesButtonsList, typesButtonToggle }) => {
  return (
    <ListGroup>
      {typesButtonsList.map(({ name, active }, index) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          variant={active ? "secondary" : "outline-scondary"}
          key={index}
          onClick={typesButtonToggle}
        >
          {name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TypeBar;
