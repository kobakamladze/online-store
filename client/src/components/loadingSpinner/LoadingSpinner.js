import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="grow" />
    </div>
  );
};

export default LoadingSpinner;
