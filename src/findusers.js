import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProfilePic } from "./profilepic";
import { Link } from "react-router-dom";

export function FindUsers() {
    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    const [newusers, setNewUsers] = useState([]);

    if (!users) {
        return null;
    }
    useEffect(() => {
        axios
            .get("/newusers")
            .then(({ data }) => {
                console.log("data in newusers get request: ", data);
                setNewUsers(data);
            })
            .catch(err => console.log("error in FindUsers: ", err));

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
        <div className="findusers-container">
            <div className="new-users">
                <div className="search-title">
                    <h4>Find people</h4>
                    <h5>Check out who recently joined!</h5>
                </div>
                {newusers.map(newuser => (
                    <div key={newuser.id} className="friend-container">
                        <ProfilePic
                            first={newuser.first}
                            last={newuser.last}
                            imageUrl={newuser.url || "/images/default.png"}
                            profilePicClass="recent-profile"
                        />
                        <div className="user-info">
                            <div className="profile-name">
                                <Link to={`/user/${newuser.id}`}>
                                    <h2>
                                        {newuser.first} {newuser.last}
                                    </h2>
                                </Link>
                                <strong>Member since: </strong>
                                <p>
                                    {new Date(
                                        newuser.created_at
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="search-users">
                <div className="search-title">
                    <h5>Are you looking for someone in particular?</h5>
                    <input
                        className="search-field"
                        onChange={e => setSearchUser(e.target.value)}
                        placeholder="Find Users"
                    />
                </div>
                {users.map(user => (
                    <div key={user.id} className="friend-container">
                        <div>
                            <ProfilePic
                                first={user.first}
                                last={user.last}
                                imageUrl={user.url || "/images/default.png"}
                                profilePicClass="recent-profile"
                            />
                        </div>
                        <div className="user-info">
                            <div className="profile-name">
                                <Link to={`/user/${user.id}`}>
                                    <h2>
                                        {user.first} {user.last}
                                    </h2>
                                </Link>
                            </div>
                            <div className="profile-editor">{user.bio}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
