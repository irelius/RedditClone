import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowLoginModal(true)}>Log In</button>
      {showLoginModal && (
        <Modal>
          <LoginForm setShowLoginModal={setShowLoginModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
