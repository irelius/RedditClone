import "./TestPage.css"

import TestOne from "./TestPageComponents/TestOne"
import TestTwo from "./TestPageComponents/TestTwo"

const TestPage = () => {


    return (
        <div id="test-page-main-container">
            <section>{TestOne()}</section>
            <section>{TestTwo()}</section>
        </div>
    )

}

export default TestPage
