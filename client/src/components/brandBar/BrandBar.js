import { ToggleButton } from "react-bootstrap";

const BrandBar = ({ brandsButtonsList, brandsButtonToggle }) => {
  return (
    <div>
      {brandsButtonsList.map(({ name, active }, index) => (
        <ToggleButton
          type="checkbox"
          variant="outline-primary"
          className="p-2 m-1"
          key={index}
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
