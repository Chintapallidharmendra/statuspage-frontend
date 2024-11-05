// src/components/StatusIndicator.js
import React from "react";

const statusColors = {
  Operational: "bg-green-500",
  "Partial Outage": "bg-yellow-500",
  "Degraded Performance": "bg-orange-500",
  "Major Outage": "bg-red-500",
  "Under Maintenance": "bg-blue-500",
};

const StatusIndicator = ({ status, bgColor }) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-white text-sm rounded ${statusColors[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusIndicator;
