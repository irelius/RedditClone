import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpFormModal() {
    const [showSignUpModal, setShowSignUpModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowSignUpModal(true)}>Sign Up</button>
            {showSignUpModal && (
                <Modal>
                    <SignUpForm setShowSignUpModal = {setShowSignUpModal} />
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;
