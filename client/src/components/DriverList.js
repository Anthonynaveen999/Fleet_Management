import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await axios.get("/api/drivers");
      setDrivers(response.data);
    };

    fetchDrivers();
  }, []);

  return (
    <div>
      <h1>Drivers</h1>
      <ul>
        {drivers.map((driver) => (
          <li key={driver._id}>
            {driver.name} - {driver.license_number}
            <Link to={`/update-driver/${driver._id}`}>Update</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverList;
