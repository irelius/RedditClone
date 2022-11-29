import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SubredditForm from "./SubredditForm";


function SubredditFormModal() {
    const [showCreateSubredditModal, setShowCreateSubredditModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowCreateSubredditModal(true)}>Create a community</button>
            {showCreateSubredditModal && (
                <Modal>
                    <SubredditForm setShowCreateSubredditModal={setShowCreateSubredditModal} />
                </Modal>
            )}
        </>
    )
}


export default SubredditFormModal;
