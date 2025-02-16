import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Products.css";

const SideList = () => {
  return (
    <div>
      <div className="sideList">
        <ul>
          <li>
            <Link to={"/Products/Grocery"}>Grocery</Link>
          </li>
          <li>
            <Link to={"/Products/Snacks"}>Snacks</Link>
          </li>
          <li>
            <Link to={"/Products/Cleaning_materials"}>Cleaning materials</Link>
          </li>
          <li>
            <Link to={"/Products/Electronics"}>Electronics</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideList;
