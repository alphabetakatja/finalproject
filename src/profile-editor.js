// profile editor using hooks

import React, { useState, useEffect } from "react";
import axios from "./axios";

export function EditProfile() {
    console.log("sanity ckeck in EditProfile component!");
    const [editingMode, setEditingMode] = useState("false");
    const [tags, setTags] = useState([]);
    const [updateProfile, setUpdateProfile] = useState([]);

    if (!editingMode) {
        return null;
    }

    useEffect(() => {
        console.log("edit profile mounted");
        axios
            .post(`/edit-profile`)
            .then(({ data }) => {
                console.log("data in edit-profile component: ", data);
                setUpdateProfile(data);
            })
            .catch(err =>
                console.log("error in edit-profile component", err.message)
            );
    });

    return (
        <div>
            <div>
                <h1>I am in im edit profile component!</h1>
            </div>
            <form className="profile-form" method="POST">
                <div className="edit-form_content">
                    <input
                        className="edit-form_input"
                        value="first"
                        type="text"
                        name="first"
                        placeholder="First Name"
                    />
                    <input
                        className="edit-form_input"
                        value="last"
                        type="text"
                        name="last"
                        placeholder="Last Name"
                    />
                    <input
                        className="edit-form_input"
                        value="email"
                        type="text"
                        name="email"
                        placeholder="E-mail Address"
                    />
                    <input
                        className="edit-form_input"
                        value="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        pattern="[a-zA-Z0-9]+"
                    />
                    <input
                        className="edit-form_input"
                        value="age"
                        type="text"
                        name="age"
                        placeholder="Age"
                    />
                    <input
                        className="edit-form_input"
                        value="url"
                        type="text"
                        name="url"
                        placeholder="Homepage"
                    />

                    <div>
                        <ion-icon name="logo-github"></ion-icon>
                        <input
                            className="edit-form_input"
                            type="text"
                            name="url"
                            placeholder="Github Account"
                        />
                    </div>
                    <label>
                        Please select a max of 2 topics you would like help with
                        from your mentor.
                    </label>
                    <select onChange={e => this.handleChange(e.target)}>
                        <option value="">--Please choose a role--</option>
                        <option value="webdev">Web Development</option>
                        <option value="mobiledev">Mobile Development</option>
                        <option value="javadev">Java Development</option>
                        <option value="python">Python Data Science</option>
                        <option value="itnetworking">IT & Networking</option>
                        <option value="interviews">
                            Interviews & Communication
                        </option>
                        <option value="joborientation">Job Orientation</option>
                        <option value="cvpresentation">
                            Cv & Personal Presentation
                        </option>
                    </select>
                    <button className="edit-form_btn" type="submit">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
