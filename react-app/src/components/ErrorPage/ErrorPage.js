import "./ErrorPage.css"

const ErrorPage = () => {
    return (
        <div id="error-page-container">
            <h1 id="error-page-header">
                Wuh oh.
            </h1>
            <p className="error-page-body">
                Seems like you're trying to access a page that doesn't exist.
            </p>
            <p className="error-page-body">
                Why don't you head back and try again? Thanks!
            </p>


        </div>
    )
}

export default ErrorPage
