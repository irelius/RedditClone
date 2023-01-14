import "./SignUpForm.css"

import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const SignUpForm = ({ setShowSignUpModal }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState("")
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user);


    const onSignup = async (e) => {
        e.preventDefault();
        const data = await dispatch(sessionActions.signUp(username, email, password));
        if (data) {
            setErrors(data);
        }
    };

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <div id="signup-modal-main-container">
            <section id="signup-modal-exit-container">
                <button onClick={() => setShowSignUpModal(false)} id="signup-modal-exit-button">
                    <i className="fa-solid fa-xmark fa-lg"></i>
                </button>
            </section>
            <section>
                <form onSubmit={onSignup} id="signup-form-modal-main-container">
                    <div id="signup-form-modal-errors-container">
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div id="signup-form-modal-text-container">
                        <h2>Sign Up</h2>
                        <p>By continuing, you are setting up a Readdit account and agree to our user Agreement and Privacy Policy.</p>
                    </div>
                    <div id="signup-form-modal-email-container">
                        <input id="signup-form-modal-email-input"
                            name='email'
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div id="signup-form-modal-password-container">
                        <input id="signup-form-modal-password-input"
                            name='password'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div id="signup-form-modal-text-container">
                        <p>Readdit is anonymous, so your username is what you’ll go by here. Choose wisely—because once you get a name, you can’t change it.</p>
                    </div>
                    <div id="signup-form-modal-username-container">
                        <input id="signup-form-modal-username-input"
                            name='username'
                            type='username'
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div id="signup-form-modal-signup-container">
                        <button id="signup-form-signup-button" type='submit'>Sign Up</button>
                    </div>
                </form>
            </section>
        </div>
    )

}

export default SignUpForm
