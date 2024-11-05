// src/pages/StatusPagePreview.js
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../backend/api";
import StatusIndicator from "../components/StatusIndicator";

const StatusPagePreview = () => {
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [components, setComponents] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [metrics, setMetrics] = useState([]);

  const params = useParams();
  const { page_id } = params || {};

  // Toggle subscription modal
  const toggleSubscribeModal = () =>
    setIsSubscribeModalOpen(!isSubscribeModalOpen);

  // Handle subscription form submission
  const handleSubscribe = async () => {
    // Send email to backend
    try {
      await api.post("status/subscribers/", { email, page: page_id });
      toast.success("Subscribed successfully!");
    } catch (err) {
      toast.error("Failed to subscribe. Please try again.");
    }
    setEmail(""); // Clear input
    toggleSubscribeModal(); // Close modal
  };

  const fetchIncidents = async () => {
    try {
      const response = await api.get(`status/incidents/?page_id=${page_id}`);
      setIncidents(response.data);
    } catch (err) {
      toast.error("Failed to load incidents.");
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await api.get(
        `status/system-metrics/?page_id=${page_id}`
      );
      setMetrics(response.data);
    } catch (err) {
      toast.error("Failed to load system metrics.");
    }
  };

  const fetchComponents = async () => {
    try {
      const response = await api.get(`status/components/?page_id=${page_id}`);
      setComponents(response.data);
    } catch (err) {
      toast.error("Failed to load components.");
    }
  };

  const getStatusBanner = () => {
    if (components.every((component) => component.status === "Operational")) {
      return { message: "All Systems Operational", color: "bg-green-500" };
    }
    if (components.some((component) => component.status === "Major Outage")) {
      return { message: "Major Outage", color: "bg-red-500" };
    }
    if (
      components.some(
        (component) =>
          component.status === "Degraded Performance" ||
          component.status === "Partial Outage"
      )
    ) {
      return { message: "Partial Outage", color: "bg-yellow-500" };
    }
    if (
      components.some((component) => component.status === "Under Maintenance")
    ) {
      return { message: "Under Maintenance", color: "bg-blue-500" };
    }
    return { message: "Partial Outage", color: "bg-gray-500" };
  };

  const { message, color } = getStatusBanner();

  useEffect(() => {
    if (page_id) {
      fetchIncidents();
      fetchMetrics();
      fetchComponents();
    }
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <header className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold">Status Page</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Email />}
          onClick={toggleSubscribeModal}
        >
          Subscribe to Updates
        </Button>
      </header>

      {/* Status Banner */}
      <div className={`${color} text-white text-center py-2 rounded mb-6`}>
        {message}
      </div>

      {/* Components Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Components</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Component</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {components.map((component) => (
              <TableRow key={component.id}>
                <TableCell>{component.name}</TableCell>
                <TableCell>
                  <StatusIndicator status={component.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* System Metrics Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">System Metrics</h2>
        <Table>
          <TableBody>
            {metrics.map((metric, index) => (
              <TableRow key={index}>
                <TableCell>{metric.name}</TableCell>
                <TableCell>{`${metric.value} ${metric.unit}`} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Past Incidents Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Past Incidents</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>
                  {incident.created_at &&
                    new Date(incident.created_at).toDateString()}
                </TableCell>
                <TableCell>{incident.title}</TableCell>
                <TableCell>{incident.description}</TableCell>
                <TableCell>{incident.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Subscribe Modal */}
      <Modal open={isSubscribeModalOpen} onClose={toggleSubscribeModal}>
        <div className="bg-white p-8 rounded shadow-lg max-w-md mx-auto mt-20">
          <h2 className="text-xl font-semibold mb-4">Subscribe for Updates</h2>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              marginBottom: "8px",
            }}
            type="email"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubscribe}
            disabled={!email}
          >
            Subscribe
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default StatusPagePreview;
