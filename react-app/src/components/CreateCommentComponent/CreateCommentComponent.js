import "./CreateCommentComponent.css"


const CreateCommentComponent = (currentUser) => {
    console.log(currentUser, "booba")

    return (
        <div id="create-comment-main-container">
            <section id="create-comment-commenter-container">
                <aside>
                    Comment as
                </aside>
                <aside id="create-comment-commenter-name">
                    {currentUser["username"]}
                </aside>
            </section>
            <section id="create-comment-form-container">
                <form id="create-comment-form">
                    <input id="create-comment-form-body"
                        type="text"
                        placeholder="What are your thoughts?"
                        minLength={1}
                        // value
                    >
                    </input>
                </form>

            </section>
        </div>
    )
}

export default CreateCommentComponent
