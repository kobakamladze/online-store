import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = ({ typesButtonsList, typesButtonToggle }) => {
  return (
    <ListGroup>
      {typesButtonsList.map(({ id, name, active }) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          variant={active ? "secondary" : "outline-scondary"}
          key={id}
          data-id={id}
          onClick={typesButtonToggle}
        >
          {name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TypeBar;
