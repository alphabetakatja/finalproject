import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProfilePic } from "./profilepic";
import { Link } from "react-router-dom";

export function FindMatch() {
    const [tags, setTags] = useState([]);
    const [searchTag, setSearchTag] = useState("");
    // const [newusers, setNewUsers] = useState([]);
    const userRole = true;
    const role = userRole === true ? "MENTOR" : "MENTEE";
    function filterByRole(array, role) {
        // if role==="MENTOR" return list of mentees
        if (role === "MENTOR") {
            return array.map(item => {
                if (item.role === false) {
                    return item;
                }
                // else {
                //     return array.filter(item => item.role === true);
                // }
            });
        }
    }

    if (!tags) {
        return null;
    }

    useEffect(() => {
        if (searchTag != "") {
            axios
                .get(`api/find-match/${searchTag}`)
                .then(({ data }) => {
                    // role of the loggedInUser
                    console.log("data in find-match/:tag get request: ", data);
                    const filteredRows = filterByRole(data, role).filter(
                        item => item != undefined
                    );
                    console.log("filtered rows: ", filteredRows);
                    // const displayFilteredProfiles = filteredRows.console.log(
                    //     "checking if the results are filtered properly: ",
                    //     displayFilteredProfiles
                    // );
                    // setTags(displayFilteredProfiles);
                    setTags(filteredRows);
                })
                .catch(err => console.log("error in FindMatch: ", err));
        }
    }, [searchTag]);

    return (
        <div>
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
    );
}
