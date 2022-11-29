import "./LPLoggedIn.css"
import Post from "../../Post/AllPosts/AllPosts"
import SubredditsBar from "../../SubredditsBar/SubredditsBar"

const LPLoggedIn = () => {
    return (
        <div id="LPLoggedIn-main-container">
            <aside id="Post-main-container">
                <Post />
            </aside>
            <aside id="SubredditsBar-main-container">
                <SubredditsBar />
            </aside>
        </div>
    )

}


export default LPLoggedIn
