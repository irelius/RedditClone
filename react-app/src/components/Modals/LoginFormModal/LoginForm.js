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
        <form onSubmit={onLogin}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    name='email'
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
            </div>
        </form>
    );
};

export default LoginForm;
