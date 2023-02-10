import "./UsersPageComments.css"

import { useHistory, useParams } from "react-router-dom"

const UsersPageComments = ({ props }) => {
    const username = useParams().username;

    const comments = props["currentUserComments"][0]
    const commentsArray = Object.values(comments)
    const posts = props["allPosts"][0]
    const subreddits = props["allSubreddits"][0]

    // console.log('booba comments', commentsArray)
    // console.log('booba posts', posts)
    // console.log('booba subreddits', subreddits)

    // return (
    //     <div>
    //         temp
    //     </div>
    // )


    return (
        Array.isArray(commentsArray) && commentsArray.map((el, i) => {
            const belongToPostId = el["post_id"]
            const postTitle = posts[belongToPostId]["title"]

            // console.log('booba', posts[belongToPostId])
            console.log('booba', postTitle)

            // console.log('booba', belongToPostId)
            // console.log('booba1', posts)


            // console.log('booba 1', posts[1]["title"])
            // console.log('booba 2', posts[commentId])

            return (
                <div key={i} id="user-comments-main-container">
                    <section id="user-comments-header-container">
                        <aside id="user-comments-header-icon">
                            <i className="fa-regular fa-message" />
                        </aside>
                        <aside id="user-comments-header-description">
                            <section>
                                {username}
                            </section>
                            {/* commented on {posts[commentId]} */}
                        </aside>
                        <aside id="user-comments-header-subreddit">

                        </aside>
                        <aside id="user-comments-header-poster">

                        </aside>

                    </section>
                    {el["body"]}
                </div>
            )
        })
    )
}

export default UsersPageComments
