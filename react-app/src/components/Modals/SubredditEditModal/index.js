// import "./SubredditEditForm.css"

// import { useState } from "react";
// import { Modal } from "../../../context/Modal";
// import SubredditEditForm from "./SubredditEditForm";


// const SubredditEditModal = () => {
//     const [showEditSubredditModal, setShowEditSubredditModal] = useState(false)

//     return (
//         <>
//             <button id="subreddit-bar-edit-button-container" onClick={() => setShowEditSubredditModal(true)}>
//                 <i id="subreddit-bar-edit-button" className="fa-regular fa-pen-to-square fa-lg" />
//             </button>
//             {showEditSubredditModal && (
//                 <Modal>
//                     <SubredditEditForm setShowEditSubredditModal={setShowEditSubredditModal} />
//                 </Modal>
//             )}
//         </>
//     )
// }

// export default SubredditEditModal

import SubredditEditForm from "./SubredditEditForm";

export default SubredditEditForm;
