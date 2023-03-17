import { ToggleButton } from "react-bootstrap";

const BrandBar = ({ brandsButtonsList, brandsButtonToggle }) => {
  return (
    <div>
      {brandsButtonsList.map(({ id, name, active }) => (
        <ToggleButton
          type="checkbox"
          variant="outline-primary"
          className="p-2 m-1"
          key={id}
          data-id={id}
          checked={active}
          onClick={brandsButtonToggle}
        >
          {name}
        </ToggleButton>
      ))}
    </div>
  );
};

export default BrandBar;
