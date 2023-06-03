import React from 'react';
import {Main} from "./Main";
import {LoginForm} from "./loginForm";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import '../../style/button.css';

export const App = () => {
    const user = useTracker(() => Meteor.user());
    console.log(user)

    const logout = e => {
        Meteor.logout();
    };

    return <div>
        {user ? (
            <div>
                <h1 className="text-center">Welcome to the publishing center</h1>
                <button className="button" onClick={logout}>Logout</button>
                <Main/>
            </div>
        ) : (
            <LoginForm/>
        )
        }
    </div>
};
