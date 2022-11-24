import "./LoginForm.css"

import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user);

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(sessionActions.login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    if (user) {
        return <Redirect to='/' />;
    }


    return (
        <div id="login-modal-main-container">
            {/* TO DO: Implement button to close login modal */}
            {/* <section id="login-modal-exit-container">
                <button onClick={setShowModal(false)} id="login-modal-exit-button">
                    <i className="fa-solid fa-xmark fa-lg"></i>
                </button>
            </section> */}
            <section>
                <form onSubmit={onLogin} id="login-form-modal-main-container">
                    <div id="login-form-modal-errors-container">
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div id="login-form-modal-text-container">
                        <h2>Log In</h2>
                        {/* TO DO: Set up a link to the User Agreement and Privacy Policy? */}
                        <p>By continuing, you agree are setting up a Reddit account and gree to our User Agreement and Privacy Policy.</p>
                    </div>
                    <div id="login-form-modal-email-container">
                        {/* <label htmlFor='email'>Email</label> */}
                        <input id="login-form-modal-email-input"
                            name='email'
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div id="login-form-modal-password-container">
                        {/* <label htmlFor='password'>Password</label> */}
                        <input id="login-form-modal-password-input"
                            name='password'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div id="login-form-modal-demo-container">
                        <button id="login-form-modal-demo-button"
                            onClick={() => {
                                setEmail("demo@aa.io")
                                setPassword("password")
                            }}
                        >
                            Demo User
                        </button>
                    </div>
                    <div id="login-form-modal-login-container">
                        <button id="login-form-login-button" type='submit'>Log In</button>
                    </div>
                </form >
            </section>
        </div >
    );
};

export default LoginForm;
