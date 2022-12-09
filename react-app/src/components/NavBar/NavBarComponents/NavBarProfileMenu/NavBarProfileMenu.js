import "./NavBarProfileMenu.css"

import ProfileMenuModal from "../../../Modals/ProfileMenuModal/ProfileMenuModal";
import { Modal } from "../../../../context/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NavBarProfileMenu = () => {
    const dispatch = useDispatch()

    const [showProfileMenu, setShowProfileMenu] = useState(false)

    const currentUser = useSelector(state => state.session.user)


    return (
        <div id="navbar-profile-main-container">
            <section id="navbar-profile-menu-container">
                <button id="navbar-profile-menu-button" onClick={() => setShowProfileMenu(true)}>
                    <aside>
                        <aside id="navbar-profile-menu-profile-pic-container">
                            <img id="navbar-profile-menu-profile-pic" src={currentUser.profile_image}
                                width={30}
                                height={30}
                            />
                        </aside>
                        <aside id="navbar-profile-menu-name">
                            {currentUser.username}
                        </aside>
                    </aside>
                    <aside id="navbar-profile-menu-arrow">
                        <i className="fa-solid fa-angle-down"></i>
                    </aside>
                </button>
            </section>
            {showProfileMenu && (
                <Modal onClose={() => setShowProfileMenu(false)}>
                    <ProfileMenuModal setShowProfileMenu={setShowProfileMenu}/>
                </Modal>
            )}
        </div>
    )
}

export default NavBarProfileMenu
