// src/pages/StatusPagePreview.js
import React, { useState } from 'react';
import { Button, Modal, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Email } from '@mui/icons-material';

const StatusPagePreview = () => {
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  // Dummy data for components, incidents, and metrics
  const components = [
    { id: 1, name: 'Web App', status: 'Operational', uptime: '99.97%' },
    { id: 2, name: 'API', status: 'Operational', uptime: '99.99%' },
    { id: 3, name: 'Database', status: 'Degraded Performance', uptime: '99.80%' },
  ];

  const incidents = [
    { id: 1, date: 'Oct 15, 2024', description: 'API downtime due to maintenance', status: 'Resolved' },
    { id: 2, date: 'Oct 10, 2024', description: 'Database connectivity issue', status: 'Resolved' },
  ];

  const metrics = [
    { name: 'API Response Time', value: '32ms' },
    { name: 'API Uptime', value: '100%' },
  ];

  // Toggle subscription modal
  const toggleSubscribeModal = () => setIsSubscribeModalOpen(!isSubscribeModalOpen);

  // Handle subscription form submission
  const handleSubscribe = () => {
    console.log('Subscribed with email:', email);
    setEmail(''); // Clear input
    toggleSubscribeModal(); // Close modal
  };

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
      <div className="bg-green-500 text-white text-center py-2 rounded mb-6">
        All Systems Operational
      </div>

      {/* Components Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Components</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Component</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Uptime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {components.map((component) => (
              <TableRow key={component.id}>
                <TableCell>{component.name}</TableCell>
                <TableCell>{component.status}</TableCell>
                <TableCell>{component.uptime}</TableCell>
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
                <TableCell>{metric.value}</TableCell>
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
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>{incident.date}</TableCell>
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
            className="mb-4"
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
