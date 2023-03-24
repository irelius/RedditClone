import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"


const PostSubreadditBar = () => {
    return (
        <div>
            hello
        </div>
        // <div onClick={(e) => redirectToSubredditPage(subredditToLoad["name"], history, e)} id="post-page-bar-main-container">
        //     <section id="post-page-bar-banner">
        //     </section>
        //     <section id="post-page-bar-header-container">
        //         <aside id="post-page-bar-icon">
        //             r/
        //         </aside>
        //         <aside id="post-page-bar-header">
        //             r/{subredditToLoad.name}
        //         </aside>
        //     </section>
        //     <section id="post-page-bar-details-container">
        //         <section id="post-page-bar-details-body">
        //             {subredditToLoad.description}
        //         </section>
        //         <section id="post-page-bar-date">
        //             Created {subredditDate}
        //         </section>
        //     </section>
        // </div>
    )
}

export default PostSubreadditBar
