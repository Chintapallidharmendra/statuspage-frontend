// src/pages/DashboardPage.js
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../backend/api";

const DashboardPage = () => {
  const [statusPages, setStatusPages] = useState([]);
  const [newPageName, setNewPageName] = useState("");
  const [newPageDescription, setNewPageDescription] = useState("");
  const [newPageURL, setNewPageURL] = useState(""); // New URL field state
  const [newPageAccountName, setNewPageAccountName] = useState(""); // New Account Name field state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the status pages when the component loads
  useEffect(() => {
    fetchStatusPages();
  }, []);

  const handlePageRedirect = (page_id) => {
    window.location.href = `/page/${page_id}`;
  };

  // Fetch existing status pages
  const fetchStatusPages = async () => {
    try {
      const response = await api.get("status/pages/");
      setStatusPages(response.data);
    } catch (err) {
      toast.error("Failed to load status pages.");
    }
  };

  // Handle creating a new status page
  const handleCreateStatusPage = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("status/pages/", {
        name: newPageName,
        description: newPageDescription,
        url: newPageURL,
        account_name: newPageAccountName,
      });
      setStatusPages([...statusPages, response.data]);
      setNewPageName("");
      setNewPageDescription("");
      setNewPageURL("");
      setNewPageAccountName("");
      setIsModalOpen(false); // Close the modal after successful creation

      // Show success toast
      toast.success("Status page created successfully!");
    } catch (err) {
      setError("Failed to create status page. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      {/* Button to open the modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Create New Status Page
      </button>

      {/* Status Pages List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Status Pages</h2>
        {statusPages.length > 0 ? (
          <ul className="space-y-4">
            {statusPages.map((page) => (
              <li key={page.id} className="p-4 bg-gray-100 rounded shadow-md">
                <div className="grid grid-cols-2 items-center gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{page.name}</h3>
                    <p className="text-gray-700">{page.description}</p>
                    <p className="text-sm text-gray-500">
                      URL:{" "}
                      <a
                        href={page.url}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {page.url}
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">
                      Account Name: {page.account_details.name}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                      onClick={() => handlePageRedirect(page.id)}
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">
            You haven't created any status pages yet.
          </p>
        )}
      </div>

      {/* Modal for Creating Status Page */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Create New Status Page
            </h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleCreateStatusPage}>
              {/* Page Name */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Page Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={newPageDescription}
                  onChange={(e) => setNewPageDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  rows="3"
                  required
                ></textarea>
              </div>

              {/* URL */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="url">
                  URL
                </label>
                <input
                  type="text"
                  id="url"
                  value={newPageURL}
                  onChange={(e) => setNewPageURL(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              {/* Account Name */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="account_name"
                >
                  Account Name
                </label>
                <input
                  type="text"
                  id="account_name"
                  value={newPageAccountName}
                  onChange={(e) => setNewPageAccountName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
