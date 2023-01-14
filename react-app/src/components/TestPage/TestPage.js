import "./TestPage.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import * as commentActions from "../../store/comment"
import * as userActions from "../../store/session"
import * as likeActions from "../../store/like"

const TestPage = () => {
    return (
        <div id="error-page-container">
            <h1 id="error-page-header">
                Wuh oh.
            </h1>
            <p className="error-page-body">
                Seems like you're trying to access a page that doesn't exist.
            </p>
            <p className="error-page-body">
                Why don't you head back and try again? Thanks!
            </p>


        </div>
    )
}

export default TestPage
