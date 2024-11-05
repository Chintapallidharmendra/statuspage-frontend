import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Modal,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import api from "../backend/api";
import { toast } from "react-toastify";
import StatusIndicator from "./StatusIndicator";

const initialFormData = {
  name: "",
  value: "",
};

const SystemMetrics = ({ page_id }) => {
  const [systemMetrics, setSystemMetrics] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currId, setCurrId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  // Fetch systemMetrics for the page
  const fetchSystemMetrics = async () => {
    try {
      const response = await api.get(
        `status/system-metrics/?page_id=${page_id}`
      );
      setSystemMetrics(response.data);
    } catch (err) {
      toast.error("Failed to load system metrics.");
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (currId) {
        await api.put(`status/system-metrics/${currId}/`, {
          ...formData,
          page: page_id,
        });
      } else {
        await api.post(`status/system-metrics/`, {
          ...formData,
          page: page_id,
        });
      }
      setFormData(initialFormData);
      setCurrId(null);
      setModalOpen(false);
      fetchSystemMetrics();
    } catch (err) {
      toast.error("Failed to save system metrics.");
    }
  };

  const handleEditClick = (systemMetric) => {
    const { id, ...rest } = systemMetric;
    setFormData(rest);
    setCurrId(systemMetric.id);
    setModalOpen(true);
  };

  const handleAddClick = () => {
    setFormData(initialFormData);
    setCurrId(null);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setFormData(initialFormData);
    setCurrId(null);
  };

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  useEffect(() => {
    if (page_id) {
      fetchSystemMetrics();
    }
  }, []);

  if (!page_id) {
    return null;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Components</h2>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleAddClick()}
      >
        New System Metric
      </Button>
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {systemMetrics.map((systemMetric) => (
            <TableRow key={systemMetric.id}>
              <TableCell>{systemMetric.name}</TableCell>
              <TableCell>{systemMetric.value.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  startIcon={<Edit />}
                  onClick={() => handleEditClick(systemMetric)}
                >
                  Edit
                </Button>
                <Button color="secondary" startIcon={<Delete />}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <div className="bg-white p-8 rounded shadow-lg max-w-md mx-auto mt-20">
          <h2 className="text-xl font-semibold mb-4">
            Create New System Metric
          </h2>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
            sx={{
              marginBottom: "8px",
            }}
          />
          <TextField
            label="Value"
            variant="outlined"
            fullWidth
            value={formData.value}
            onChange={(e) => handleFormChange("value", e.target.value)}
            sx={{
              marginBottom: "8px",
            }}
            type="number"
          />
          <div className="flex">
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
              fullWidth
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleModalClose}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SystemMetrics;
