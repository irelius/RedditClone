import "./SubredditCreateForm.css"

import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SubredditCreateForm from "./SubredditCreateForm";


function SubredditCreateModal({ setShowProfileMenu }) {
    const [showCreateSubredditModal, setShowCreateSubredditModal] = useState(false)

    return (
        <section>
            <button id="subreddit-create-modal-button" onClick={() => {
                setShowCreateSubredditModal(true)
            }}>Create a community</button>
            {showCreateSubredditModal && (
                <Modal>
                    <SubredditCreateForm setShowCreateSubredditModal={setShowCreateSubredditModal} setShowProfileMenu={setShowProfileMenu} />
                </Modal>
            )}
        </section>
    )
}


export default SubredditCreateModal;
