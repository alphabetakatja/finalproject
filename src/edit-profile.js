import React, { useState, useEffect } from "react";
import axios from "./axios";

export function EditProfile() {
    console.log("sanity ckeck in EditProfile component!");
    const [editingMode, setEditingMode] = useState("false");

    useEffect(() => {
        console.log("edit profile mounted");
        // axios.get(`/edit-profile`).then({ data });
    });

    return (
        <div>
            <div>
                <h1>I am in im edit profile component!</h1>
            </div>
            <form className="edit-form">
                <select>
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
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
