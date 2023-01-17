import { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";

const brandsList = [{ name: "Samsung" }, { name: "Lenovo" }];

const BrandBar = () => {
  const [buttonsList, setButtonsList] = useState(
    brandsList.map(({ name }) => ({ name, active: false }))
  );

  const handleActiveButton = (e) =>
    setButtonsList((state) => [
      ...state.map((button) =>
        button.name === e.target.textContent
          ? { ...button, active: !button.active }
          : button
      ),
    ]);

  return (
    <div>
      {buttonsList.map(({ name, active }, index) => (
        <ToggleButton
          type="checkbox"
          variant="outline-primary"
          className="p-2 m-1"
          key={index}
          checked={active}
          onClick={handleActiveButton}
        >
          {name}
        </ToggleButton>
      ))}
    </div>
  );
};

export default BrandBar;
