import "./LPNotLoggedIn.css"

import Post from "../../Post/AllPosts/AllPosts"
import SubredditsBar from "../../SubredditsBar/SubredditsBar"

const LPNotLoggedIn = () => {
    return (
        <div id="LPNotLoggedIn-main-container">
            <aside id="Post-main-container">
                <Post />
            </aside>
            <aside id="SubredditsBar-main-container">
                <SubredditsBar />
            </aside>
        </div>
    )
}

export default LPNotLoggedIn
