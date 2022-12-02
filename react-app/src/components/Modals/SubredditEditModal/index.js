import { useState } from "react";
import { Modal } from "../../../context/Modal";
import SubredditEditForm from "./SubredditEditForm";


function SubredditEditModal() {
    const [showEditSubredditModal, setShowEditSubredditModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowEditSubredditModal(true)}>
            </button>
            {showEditSubredditModal && (
                <Modal>
                    <SubredditEditForm setShowEditSubredditModal={setShowEditSubredditModal} />
                </Modal>
            )}
        </>
    )
}

export default SubredditEditModal
