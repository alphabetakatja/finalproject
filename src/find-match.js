import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProfilePic } from "./profilepic";
import { Link } from "react-router-dom";

export function FindMatch(props) {
    console.log("props in findmatch: ", props);
    const [tags, setTags] = useState([]);
    const [searchTag, setSearchTag] = useState("");
    const [availableUsers, setAvailableUsers] = useState([]);

    const userRole = props.mentor;
    const role = userRole === true ? true : false;
    function filterByRole(array, role) {
        return array.filter(item => {
            return item.role != role;
        });
    }
    function filterUsers(array, role) {
        return array.filter(item => {
            return item.mentor != role;
        });
    }

    if (!tags) {
        return null;
    }

    useEffect(() => {
        axios
            .get("/available-users")
            .then(({ data }) => {
                console.log("data in availableUsers get request: ", data);
                const filteredUsers = filterUsers(data, role);
                setAvailableUsers(filteredUsers);
            })
            .catch(err => console.log("error in FindUsers: ", err));

        if (searchTag != "") {
            axios
                .get(`api/find-match/${searchTag}`)
                .then(({ data }) => {
                    const filteredRows = filterUsers(data, role);
                    console.log("filtered rows: ", filteredRows);
                    setTags(filteredRows);
                })
                .catch(err => console.log("error in FindMatch: ", err));
        }
    }, [searchTag]);

    return (
        <div>
            <div className="findusers-container">
                <div className="search-title">
                    <h4>Check out who recently joined...</h4>
                </div>
                <div className="new-users">
                    {availableUsers.map(user => (
                        <div key={user.id} className="friend-container">
                            <div className="profile-name">
                                <Link to={`/user/${user.id}`}>
                                    <h3>
                                        {user.first} {user.last}
                                    </h3>
                                </Link>
                            </div>
                            <ProfilePic
                                first={user.first}
                                last={user.last}
                                imageUrl={user.url || "/images/default.png"}
                                profilePicClass="recent-profile"
                            />
                            <div className="user-info">
                                <strong>Member since: </strong>
                                <p>
                                    {new Date(user.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="search-title">
                    <h4>Are you looking for someone in particular?</h4>
                    <h5>Check out the list of available mentors...</h5>
                    <input
                        className="search-field"
                        onChange={e => setSearchTag(e.target.value)}
                        placeholder="Find a Match"
                    />
                </div>
                <div className="new-users">
                    {tags.map(tag => (
                        <div key={tag.id} className="friend-container">
                            <div className="profile-name">
                                <Link to={`/user/${tag.id}`}>
                                    <h3>
                                        {tag.first} {tag.last}
                                    </h3>
                                </Link>
                            </div>
                            <ProfilePic
                                first={tag.first}
                                last={tag.last}
                                imageUrl={tag.url || "/images/default.png"}
                                profilePicClass="recent-profile"
                            />

                            <div className="user-info">
                                <div className="profile-editor">{tag.tag}</div>
                                <div className="profile-editor">{tag.bio}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
