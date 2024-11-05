// src/pages/ManagementDashboard.js
import React, { useState } from "react";
import Incidents from "../components/Incidents";
import { useParams } from "react-router-dom";
import StatusComponents from "../components/StatusComponents";
import SystemMetrics from "../components/SystemMetrics";

const ManagementDashboard = () => {
  const params = useParams();
  const { page_id } = params || {};
  const [activeTab, setActiveTab] = useState("incidents");

  // Render the current tab content based on the active tab
  const renderTabContent = () => {
    if (activeTab === "incidents") {
      return <Incidents page_id={page_id} />;
    } else if (activeTab === "components") {
      return <StatusComponents page_id={page_id} />;
    } else if (activeTab === "system_metrics") {
      return <SystemMetrics page_id={page_id} />;
    }
  };

  if (!page_id) {
    return null;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Manage Page</h2>
        <button
          className={`w-full text-left p-2 mb-2 rounded ${
            activeTab === "incidents" ? "bg-gray-600" : ""
          }`}
          onClick={() => setActiveTab("incidents")}
        >
          Manage Incidents
        </button>
        <button
          className={`w-full text-left p-2 mb-2 rounded ${
            activeTab === "components" ? "bg-gray-600" : ""
          }`}
          onClick={() => setActiveTab("components")}
        >
          Manage Components
        </button>
        <button
          className={`w-full text-left p-2 mb-2 rounded ${
            activeTab === "system_metrics" ? "bg-gray-600" : ""
          }`}
          onClick={() => setActiveTab("system_metrics")}
        >
          Manage System Metrics
        </button>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6 overflow-auto">{renderTabContent()}</div>
    </div>
  );
};

export default ManagementDashboard;
