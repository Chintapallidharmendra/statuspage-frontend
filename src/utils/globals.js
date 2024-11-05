export const getAuthFromStorage = () => {
  return localStorage.getItem("auth");
};

export const getToken = () => {
  const auth = getAuthFromStorage();
  if (!auth) return null;
  return JSON.parse(auth).token;
};

export const componentStatuses = [
  "Operational",
  "Partial Outage",
  "Degraded Performance",
  "Major Outage",
  "Under Maintenance",
];

export const incidentStatuses = [
  "Investigating",
  "Identified",
  "Monitoring",
  "Resolved",
];
