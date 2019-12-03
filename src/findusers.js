// a new component with a search input field
// function component with hooks,
// useState - array of users, and value of the input field
// useEffect
//
// when the component mounts you wont have any users (null)
// after the first render we do an ajax req
// query order by id desc (just first and last);

// userId as key property

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProfilePic } from "./profilepic";
import { Link } from "react-router-dom";

export function FindUsers() {
    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    let userInput;
    if (!users) {
        return null;
    }
    useEffect(() => {
        userInput = false;
        axios.get(`/users/${searchUser}`).then(({ data }) => {
            console.log("data in findUsers get request: ", data);
            if (!userInput) {
                setUsers(users.concat(data));
            }
            console.log(users);
        });
        // .catch(err => console.log("error in FindUsers: ", err));
    }, [searchUser]);
    return (
        <div>
            <div>
                <h5>Hello, Im in findUsers!</h5>
            </div>
            <div>
                <input
                    onChange={e => setSearchUser(e.target.value)}
                    placeholder="Find Users"
                />
            </div>
            <div>
                {users.map(user => (
                    <div key={user.id}>
                        {user.first}
                        {user.last}
                    </div>
                ))}
            </div>
        </div>
    );
}
