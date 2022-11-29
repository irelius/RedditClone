import "./CreateSubredditModal.css"

const SubredditForm = () => {
    return (
        <div id="subreddit-modal-main-container">
            <section id="header-container">
                <aside id="header-title">
                    Create a community
                </aside>
                <aside id="header-exit">

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
