import "./SearchCommunitiesComponent.css"

import { useHistory } from "react-router-dom"

import searchCommunitiesFunction from "../searchHelperFunctions/searchCommunitiesFunction"
import redirectToSubredditPage from "../../../HelperFunctions/redirectToSubredditPage"


const SearchCommunitiesComponent = ({ props }) => {
    const history = useHistory()

    let searchCommunitiesArray = searchCommunitiesFunction(props)

    const searchCommunitiesComponent = () => {
        if (searchCommunitiesArray.length > 0) {
            return (
                Array.isArray(searchCommunitiesArray) && searchCommunitiesArray.map((el, i) => {
                    console.log('booba', el)

                    return (
                        <div key={i} id="search-communities-container">
                            <aside id="search-communities-left-section">
                                <section id="search-community-name" onClick={(e) => redirectToSubredditPage(el["name"], history, e)}>
                                    r/{el["name"]}
                                </section>
                                <section id="search-community-description">
                                    {el["description"]}
                                </section>
                            </aside>
                            <aside id="search-communities-right-section">
                                <button id="search-communities-redirect-button" onClick={(e) => redirectToSubredditPage(el["name"], history, e)}>Visit</button>
                            </aside>
                        </div>
                    )
                })
            )
        } else {
            return (
                <div id="search-communities-no-results-container">
                    <section id="search-communities-no-results-header">
                        Hm... we couldn’t find any results for "{props["searchParam"]}"
                    </section>
                    <section id="search-communities-no-results-subtitle">
                        Double-check your spelling or try different keywords to adjust your search
                    </section>
                </div>
            )
        }
    }

    return (
        <div id="search-communities-main-container">
            {searchCommunitiesComponent()}
        </div>
    )
}

export default SearchCommunitiesComponent
