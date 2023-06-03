import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import '../../style/loginStyle.css'

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = e => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password);
    };

    return (
        <div class="container">
            <img src="https://dwstroy.ru/lessons/les3373/demo/img/men.png" alt="Image not found"/>
            <form onSubmit={submit}>
                <div class="dws-input">
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div class="dws-input">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" class="dws-submit" name="submit">Log In</button>
            </form>
        </div>
    );
}