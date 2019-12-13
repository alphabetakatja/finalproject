import React, { useRef, useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export function SelectRole() {
    const [roleType, setRoleType] = useState("");

    useEffect(() => {
        if (roleType != "") {
            console.log("type of role");
        }
    });

    return (
        <select
            ref={roleType}
            className="register-form_input"
            name="role"
            id="role-select"
        >
            <option value="">--Please choose a role--</option>
            <option value="mentor" onSelect={e => this.handleChange(e.target)}>
                Mentor
            </option>
            <option value="mentee" onSelect={e => this.handleChange(e.target)}>
                Mentee
            </option>
        </select>
    );
}
