const NoPostsToLoad = () => {
    const subredditName = window.location.href.split("/")[4]
    return (
        <div id="subreddit-no-posts-main-container">
            <section id="subreddit-no-post-title">
                r/{subredditName} doesn't have any posts
                <i id="subreddit-no-post-unhappy-face" className="fa-regular fa-face-frown fa-lg" />
            </section>
            <section id="subreddit-no-post-body">
                Why don't you fix that?
                <i id="subreddit-no-post-wink-face" className="fa-regular fa-face-smile-wink fa-lg" />
            </section>
        </div>
    )
}

export default NoPostsToLoad;
