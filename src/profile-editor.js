import React, { useState, useEffect } from "react";
import axios from "./axios";

export function EditProfile() {
    console.log("sanity ckeck in EditProfile component!");
    const [editingMode, setEditingMode] = useState("false");

    useEffect(() => {
        console.log("edit profile mounted");
        // axios.get(`/edit-profile`).then({ data });
    }, []);

    return (
        <div>
            <h1>I am in im edit profile component!</h1>
        </div>
    );
}
