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
import { incidentStatuses } from "../utils/globals";
import { Add, Edit, Delete } from "@mui/icons-material";
import api from "../backend/api";
import { toast } from "react-toastify";

const initialFormData = {
  title: "",
  description: "",
  status: "",
};

const Incidents = ({ page_id }) => {
  const [incidents, setIncidents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currId, setCurrId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  // Fetch incidents for the page
  const fetchIncidents = async () => {
    try {
      const response = await api.get(`status/incidents/?page_id=${page_id}`);
      setIncidents(response.data);
    } catch (err) {
      toast.error("Failed to load incidents.");
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (currId) {
        await api.put(`status/incidents/${currId}/`, {
          ...formData,
          page: page_id,
        });
      } else {
        await api.post(`status/incidents/`, { ...formData, page: page_id });
      }
      setFormData(initialFormData);
      setCurrId(null);
      setModalOpen(false);
      fetchIncidents();
    } catch (err) {
      toast.error("Failed to save incident.");
    }
  };

  const handleEditClick = (incident) => {
    const { id, ...rest } = incident;
    setFormData(rest);
    setCurrId(incident.id);
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
      fetchIncidents();
    }
  }, []);

  if (!page_id) {
    return null;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Incidents</h2>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleAddClick()}
      >
        New Incident
      </Button>
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow key={incident.id}>
              <TableCell>{incident.title}</TableCell>
              <TableCell>{incident.description}</TableCell>
              <TableCell>{incident.status}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  startIcon={<Edit />}
                  onClick={() => handleEditClick(incident)}
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
          <h2 className="text-xl font-semibold mb-4">Create New Incident</h2>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={(e) => handleFormChange("title", e.target.value)}
            sx={{
              marginBottom: "8px",
            }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            value={formData.description}
            onChange={(e) => handleFormChange("description", e.target.value)}
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
            {incidentStatuses.map((status) => {
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

export default Incidents;
