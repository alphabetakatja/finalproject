import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProfilePic } from "./profilepic";
import { Link } from "react-router-dom";

export function FindMatch() {
    const [tags, setTags] = useState([]);
    const [searchTag, setSearchTag] = useState("");
    // const [newusers, setNewUsers] = useState([]);

    if (!tags) {
        return null;
    }

    useEffect(() => {
        if (searchTag != "") {
            axios
                .get(`api/find-match/${searchTag}`)
                .then(({ data }) => {
                    console.log("data in find-match/:tag get request: ", data);
                    setTags(data);
                })
                .catch(err => console.log("error in FindMatch: ", err));
        }
    }, [searchTag]);

    return (
        <div>
            <div className="search-title">
                <h4>Are you looking for someone in particular?</h4>
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
