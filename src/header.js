import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function Header(props) {
    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState("");

    if (!users) {
        return null;
    }

    useEffect(() => {
        if (searchUser != "") {
            axios
                .get(`/users/${searchUser}`)
                .then(({ data }) => {
                    console.log("data in findUsers get request: ", data);

                    setUsers(data);
                })
                .catch(err => console.log("error in FindUsers: ", err));
        }
    }, [searchUser]);

    return (
        <div className="app-header">
            <img className="app-logo" src="/images/logo-w.png" alt="logo" />

            <nav>
                <ul className="navbar">
                    <li>
                        <Link to="/">
                            <ion-icon name="person"></ion-icon>
                            profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/friends">
                            <ion-icon name="people"></ion-icon>
                            friends
                        </Link>
                    </li>
                    <li>
                        <Link to="/users">
                            <ion-icon name="search"></ion-icon>
                            search
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <ion-icon name="chatboxes"></ion-icon>
                            chat
                        </Link>
                    </li>
                    <li>
                        <a href="/logout">
                            <ion-icon name="log-out"></ion-icon>
                            logout
                        </a>
                    </li>
                </ul>
            </nav>

            {props.children}
        </div>
    );
}
