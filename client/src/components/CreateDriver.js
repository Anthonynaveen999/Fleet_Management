import React, { useState } from "react";
import axios from "axios";

const CreateDriver = () => {
  const [driver, setDriver] = useState({
    name: "",
    aadhar_number: "",
    license_number: "",
    current_location: "",
    preferred_destinations: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver({ ...driver, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/drivers", driver);
    // Redirect or update state after creation
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={driver.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Aadhar Number:
        <input
          type="text"
          name="aadhar_number"
          value={driver.aadhar_number}
          onChange={handleChange}
        />
      </label>
      <label>
        License Number:
        <input
          type="text"
          name="license_number"
          value={driver.license_number}
          onChange={handleChange}
        />
      </label>
      <label>
        Current Location:
        <input
          type="text"
          name="current_location"
          value={driver.current_location}
          onChange={handleChange}
        />
      </label>
      <label>
        Preferred Destinations:
        <input
          type="text"
          name="preferred_destinations"
          value={driver.preferred_destinations}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Create Driver</button>
    </form>
  );
};

export default CreateDriver;
