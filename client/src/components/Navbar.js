import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/drivers">Drivers</Link>
        </li>
        <li>
          <Link to="/vehicles">Vehicles</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/create-driver">Create Driver</Link>
        </li>
        <li>
          <Link to="/create-vehicle">Create Vehicle</Link>
        </li>
        <li>
          <Link to="/create-order">Create Order</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
