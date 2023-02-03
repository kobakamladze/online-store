import { Row, Pagination } from "react-bootstrap";

import DeviceCard from "../deviceCard/DeviceCard";

const DeviceCardsList = ({ devicesList }) => {
  return devicesList.map((device, idx) => (
    <DeviceCard key={idx} device={device} />
  ));
};

const DeviceCatalog = ({ devices, page, setPage }) => {
  const pagesAmount = Math.ceil(devices.count / 9);
  const paginationItem = [];

  for (let number = 1; number <= pagesAmount; number++) {
    paginationItem.push(
      <Pagination.Item
        key={number}
        onClick={() => setPage(number)}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (!devices.rows.length) return <h3>No data found</h3>;
  return (
    <>
      <Row className="d-flex">
        <DeviceCardsList devicesList={devices.rows} />
        {!(paginationItem.length > 1) ? null : (
          <Pagination className="my-4 me-0">{paginationItem}</Pagination>
        )}
      </Row>
    </>
  );
};

export default DeviceCatalog;
