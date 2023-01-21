import "./LPNotLoggedIn.css"

import AllPosts from "../../Post/AllPosts/AllPosts"
import SubredditsBar from "../../SubredditsBar/SubredditsBar"

const LPNotLoggedIn = () => {
    return (
        <div id="LPNotLoggedIn-main-container">
            <aside id="Post-main-container">
                <AllPosts />
            </aside>
            <aside id="SubredditsBar-main-container">
                <SubredditsBar />
            </aside>
        </div>
    )
}

export default LPNotLoggedIn
