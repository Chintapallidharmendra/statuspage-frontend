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

const initialFormData = {
  email: "",
};

const Subscribers = ({ page_id }) => {
  const [subscribers, setSubscribers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currId, setCurrId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  // Fetch subscribers for the page
  const fetchSubscribers = async () => {
    try {
      const response = await api.get(`status/subscribers/?page_id=${page_id}`);
      setSubscribers(response.data);
    } catch (err) {
      toast.error("Failed to load system metrics.");
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (currId) {
        await api.put(`status/subscribers/${currId}/`, {
          ...formData,
          page: page_id,
        });
      } else {
        await api.post(`status/subscribers/`, {
          ...formData,
          page: page_id,
        });
      }
      setFormData(initialFormData);
      setCurrId(null);
      setModalOpen(false);
      fetchSubscribers();
    } catch (err) {
      toast.error("Failed to save subscriber");
    }
  };

  const handleEditClick = (subscriber) => {
    const { id, ...rest } = subscriber;
    setFormData(rest);
    setCurrId(subscriber.id);
    setModalOpen(true);
  };

  const handleAddClick = () => {
    setFormData(initialFormData);
    setCurrId(null);
    setModalOpen(true);
  };

  const handleDeleteClick = async (subscriber_id) => {
    try {
      await api.delete(`status/subscribers/${subscriber_id}/`);
      fetchSubscribers();
    } catch (err) {
      toast.error("Failed to delete subscriber");
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
      fetchSubscribers();
    }
  }, []);

  if (!page_id) {
    return null;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Subscribers</h2>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleAddClick()}
      >
        New Subscriber
      </Button>
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribers.map((subscriber) => (
            <TableRow key={subscriber.id}>
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  startIcon={<Edit />}
                  onClick={() => handleEditClick(subscriber)}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteClick(subscriber.id)}
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
          <h2 className="text-xl font-semibold mb-4">Create New Subscriber</h2>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={(e) => handleFormChange("email", e.target.value)}
            sx={{
              marginBottom: "8px",
            }}
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

export default Subscribers;
