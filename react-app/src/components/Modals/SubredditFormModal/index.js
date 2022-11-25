import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SubredditForm from "./SubredditForm";

function SubredditFormModal() {
    const [showSubredditModal, setShowSubredditModal] = useState(false)

    return (

        <>
            <button onClick={() => setShowSubredditModal(true)}>Create a community</button>
            {showSubredditModal && (
                <Modal>
                    <LoginForm setShowSubredditModal={setShowSubredditModal} />
                </Modal>
            )}
        </>
    )
}


export default SubredditFormModal;
