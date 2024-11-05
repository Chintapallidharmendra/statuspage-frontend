// src/pages/PrivacyPolicy.js
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Privacy Policy</h1>
      
      <div className="text-lg text-gray-700 leading-relaxed">
        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our Status Page application. By using this application, you agree to the terms of this policy.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect information from you when you register on our site, subscribe to updates, or interact with our application. The information we collect may include:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Personal details like your name, email address, and account information.</li>
          <li>Service usage data, including activity logs and system metrics.</li>
          <li>Technical information, such as IP addresses and browser type.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          The information we collect is used to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Provide and maintain our services.</li>
          <li>Send notifications regarding system status, incidents, and maintenance updates.</li>
          <li>Improve our application based on user feedback and activity.</li>
          <li>Ensure security and protect against fraudulent activity.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">3. Data Sharing and Security</h2>
        <p className="mb-4">
          We do not share your personal information with third parties, except as necessary to operate our application or comply with legal obligations. We implement appropriate security measures to protect your information, but please be aware that no method of transmission over the Internet is completely secure.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">4. Your Choices and Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal information. You can manage your communication preferences by unsubscribing from notifications at any time.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">5. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the effective date below.
        </p>
        <p className="italic">Effective date: January 1, 2024</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">6. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="text-blue-500">chintapallidharmendra@gmail.com</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
