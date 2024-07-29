import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/Signup';
import Signin from './pages/Signin';
import Home from './components/Home';
import Notification from './components/Notification/Notification';
import Modal from './components/Modal.jsx';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Notification />
        {isModalOpen && <Modal onClose={closeModal} />}
      </Router>
    </div>
  );
}

export default App;
