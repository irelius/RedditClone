import "./SearchPeopleComponent.css"

import { useHistory } from "react-router-dom"

import searchPeoplesFunction from "../searchHelperFunctions/searchPeoplesFunction"
import redirectToUserPage from "../../../HelperFunctions/redirectToUserPage"

const SearchPeopleComponent = ({ props }) => {
    const history = useHistory()

    let searchPeoplesArray = searchPeoplesFunction(props)


    const searchPeoplesComponent = () => {
        if (searchPeoplesArray.length > 0) {
            return (
                Array.isArray(searchPeoplesArray) && searchPeoplesArray.map((el, i) => {
                    return (
                        <div key={i} id="search-peoples-container">
                            <aside id="search-peoples-left-section">
                                <section id="search-community-name" onClick={(e) => redirectToUserPage(el["username"], history, e)}>
                                    u/{el["username"]}
                                </section>
                            </aside>
                            <aside id="search-peoples-right-section">
                                <button id="search-peoples-redirect-button" onClick={(e) => redirectToUserPage(el["username"], history, e)}>Visit</button>
                            </aside>
                        </div>
                    )
                })
            )
        } else {
            return (
                <div id="search-peoples-no-results-container">
                    <section id="search-peoples-no-results-header">
                        Hm... we couldn’t find any results for "{props["searchParam"]}"
                    </section>
                    <section id="search-peoples-no-results-subtitle">
                        Double-check your spelling or try different keywords to adjust your search
                    </section>
                </div>
            )
        }
    }

    return (
        <div id="search-peoples-main-container">
            {searchPeoplesComponent()}
        </div>
    )
}

export default SearchPeopleComponent
