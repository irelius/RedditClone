import "./SubredditForm.css"

const SubredditForm = ({ setShowCreateSubredditModal }) => {
    return (
        <div id="subreddit-modal-main-container">
            <section id="header-container">
                <aside id="header-title">
                    Create a community
                </aside>
                <aside id="header-exit">
                    <button onClick={() => setShowCreateSubredditModal(false)} id="create-subreddit-modal-exit-button">
                        <i className="fa-solid fa-xmark fa-lg"></i>
                    </button>
                </aside>
            </section>
            <section id="name-container">
                <section>Name</section>
                <section>Community names including capitalization cannot be changed.</section>
            </section>
            <input id="subreddit-name-input-container">

            </input>
            <input id="subreddit-description-input-container">
            </input>
            <section id="footer-container">
                <button id="footer-create-subreddit-button">
                    Create Community
                </button>
                <button id="footer-cancel-button">
                    Cancel
                </button>
            </section>
        </div>
    )
}

export default SubredditForm;
