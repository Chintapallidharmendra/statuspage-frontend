import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  TextField,
  Modal,
} from "@mui/material";
import { componentStatuses } from "../utils/globals";
import { Add, Edit, Delete } from "@mui/icons-material";
import api from "../backend/api";
import { toast } from "react-toastify";
import StatusIndicator from "./StatusIndicator";

const initialFormData = {
  name: "",
  status: "",
};

const StatusComponents = ({ page_id }) => {
  const [components, setComponents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currId, setCurrId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  // Fetch components for the page
  const fetchIncidents = async () => {
    try {
      const response = await api.get(`status/components/?page_id=${page_id}`);
      setComponents(response.data);
    } catch (err) {
      toast.error("Failed to load components.");
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (currId) {
        await api.put(`status/components/${currId}/`, {
          ...formData,
          page: page_id,
        });
      } else {
        await api.post(`status/components/`, { ...formData, page: page_id });
      }
      setFormData(initialFormData);
      setCurrId(null);
      setModalOpen(false);
      fetchIncidents();
    } catch (err) {
      toast.error("Failed to save component.");
    }
  };

  const handleEditClick = (component) => {
    const { id, ...rest } = component;
    setFormData(rest);
    setCurrId(component.id);
    setModalOpen(true);
  };

  const handleAddClick = () => {
    setFormData(initialFormData);
    setCurrId(null);
    setModalOpen(true);
  };

  const handleDeleteClick = async (component_id) => {
    try {
      await api.delete(`status/components/${component_id}/`);
      fetchIncidents();
    } catch (err) {
      toast.error("Failed to delete component.");
    }
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
      fetchIncidents();
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
        New Component
      </Button>
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {components.map((component) => (
            <TableRow key={component.id}>
              <TableCell>{component.name}</TableCell>
              <TableCell>
                <StatusIndicator status={component.status} />
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  startIcon={<Edit />}
                  onClick={() => handleEditClick(component)}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteClick(component.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <div className="bg-white p-8 rounded shadow-lg max-w-md mx-auto mt-20">
          <h2 className="text-xl font-semibold mb-4">Create New Component</h2>
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

          <Select
            onChange={(e) => handleFormChange("status", e.target.value)}
            sx={{
              marginBottom: "8px",
            }}
            fullWidth
            value={formData.status}
          >
            {componentStatuses.map((status) => {
              return <MenuItem value={status}>{status}</MenuItem>;
            })}
          </Select>
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

export default StatusComponents;
