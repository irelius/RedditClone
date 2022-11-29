import LPLoggedIn from "./LPLoggedIn";
import LPNotLoggedIn from "./LPNotLoggedIn/LPNotLoggedIn";
import { useSelector } from "react-redux";

const LandingPage = () => {
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) {
        return (
            <LPLoggedIn />
        )
    } else {
        return (
            <LPNotLoggedIn />
        )
    }
}

export default LandingPage
