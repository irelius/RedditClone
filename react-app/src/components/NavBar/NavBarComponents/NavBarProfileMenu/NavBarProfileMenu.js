import "./NavBarProfileMenu.css"

import ProfileMenuModal from "../../../Modals/ProfileMenuModal/ProfileMenuModal";
import { Modal } from "../../../../context/Modal";
import { useState } from "react";

const NavBarProfileMenu = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false)

    return (
        <div id="navbar-profile-main-container">
            <section id="navbar-profile-menu-container">
                <button id="navbar-profile-menu-button" onClick={() => setShowProfileMenu(true)}>
                    <aside>
                        <aside id="navbar-profile-menu-profile-pic">
                            PP
                        </aside>
                        <aside id="navbar-profile-menu-name">
                            Test User
                        </aside>
                    </aside>
                    <aside id="navbar-profile-menu-arrow">
                        <i className="fa-solid fa-angle-down"></i>
                    </aside>
                </button>
            </section>
            {showProfileMenu && (
                <Modal onClose={() => setShowProfileMenu(false)}>
                    <ProfileMenuModal />
                </Modal>
            )}
        </div>
    )
}

export default NavBarProfileMenu
