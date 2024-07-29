import React from 'react';

// Modal component definition
const Modal = ({ }) => {
  return (
    // Full-screen overlay with a semi-transparent black background
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      {/* Modal content container */}
      <div className="bg-[#081b29] p-6 rounded-lg shadow-lg max-w-md w-full relative">
      
        {/* Modal title */}
        <h2 className="text-2xl font-semibold text-white mb-4">
          Welcome to chatMe 👋
        </h2>
        
        {/* First paragraph of modal content */}
        <p className="text-white">
          This project is not compatible with your device, please try using a desktop or tablet.
        </p>
        
        {/* Second paragraph of modal content */}
        <p className="text-white">
          We are working on compatible versions for your device in subsequent release.
        </p>
      </div>
    </div>
  );
};

export default Modal;
