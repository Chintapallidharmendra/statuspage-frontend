// src/pages/About.js
import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">About This Application</h1>
      
      <div className="text-lg text-gray-700 leading-relaxed">
        <p className="mb-4">
          Welcome to our Status Page application! This application is designed to help organizations communicate the real-time and historical status of their services with their users. 
          Whether it’s a planned maintenance or an unexpected incident, users can stay informed about the state of the systems they rely on.
        </p>
        
        <p className="mb-4">
          With this application, users can:
          <ul className="list-disc list-inside mt-2">
            <li>View the status of various components and services.</li>
            <li>Subscribe to updates via email to stay informed about incidents and maintenance.</li>
            <li>Check historical uptime and performance metrics for full transparency.</li>
            <li>Access detailed incident reports to understand the impact and resolution of past issues.</li>
          </ul>
        </p>

        <p className="mb-4">
          The application’s dashboard enables users to easily create, manage, and update their own status pages. Each status page provides detailed information on system metrics, incidents, and components, which can help build trust with end-users by offering transparency and timely updates.
        </p>

        <p className="mb-4">
          This project is built using modern web technologies, including:
          <ul className="list-disc list-inside mt-2">
            <li><strong>Backend:</strong> Django REST Framework for API management.</li>
            <li><strong>Frontend:</strong> React for a dynamic user interface.</li>
            <li><strong>Styling:</strong> Tailwind CSS for responsive design, with MUI components when needed.</li>
          </ul>
        </p>

        <p>
          We hope this application will make incident communication and system transparency easier for your organization. Thank you for using our platform!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
