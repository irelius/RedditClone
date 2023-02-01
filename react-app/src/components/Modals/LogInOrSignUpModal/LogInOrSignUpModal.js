
import "./LogInOrSignUpModal.css"

import LoginModal from "../../Modals/LoginModal"
import SignUpModal from "../../Modals/SignUpModal"

const LogInOrSignUpModal = ({ setAskUserToLogin }) => {

    return (
        <div id="ask-user-before-voting-main-container">
            <section id="ask-user-header-section">
                <button onClick={() => setAskUserToLogin(false)} id="ask-before-exit-button">
                    <i className="fa-solid fa-xmark fa-lg"></i>
                </button>
            </section>
            <section id="ask-user-main-section">
                <h3>You can vote on posts and comments to help everyone find the best content with a Reddit account. </h3>                <p>By continuing, you are setting up a Reddit account and agree to our User Agreement and Privacy Policy. </p>
                <section id="ask-user-before-voting-signup">
                    <SignUpModal />
                </section>
            </section>
            <section id="ask-user-footer-section">
                <p>Already a readditor?</p>
                <section id='ask-user-footer-login-modal'>
                    <LoginModal />
                </section>
            </section>
        </div>
    )
}

export default LogInOrSignUpModal;
