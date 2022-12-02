import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SubredditCreateForm from "./SubredditCreateForm";


function SubredditCreateModal() {
    const [showCreateSubredditModal, setShowCreateSubredditModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowCreateSubredditModal(true)}>Create a community</button>
            {showCreateSubredditModal && (
                <Modal>
                    <SubredditCreateForm setShowCreateSubredditModal={setShowCreateSubredditModal} />
                </Modal>
            )}
        </>
    )
}


export default SubredditCreateModal;
