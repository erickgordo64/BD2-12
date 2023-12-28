// NoNavLayout.js
import React from 'react';
import { Outlet } from "react-router-dom";

const NoLayout = () => {
  return (
    <div className="layout-container">
      <Outlet />
    </div>
  );
};

export default NoLayout;
