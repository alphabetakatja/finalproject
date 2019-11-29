// profile.js contains last, first, ProfilePic and bio;

import React from "react";
import { ProfilePic } from "./profilepic";
import { BioEditor } from "./bioeditor";

export function Profile(props) {
    console.log("props in Profile: ", props);
    return (
        <div className="profile-container">
            <h1>
                Hi {props.first} {props.last}!
            </h1>
            <ProfilePic
                first={props.first}
                last={props.last}
                imageUrl={props.imageUrl}
                profilePicClass="big-profile"
            />
            <BioEditor bio={props.bio} updateBio={props.updateBio} />
        </div>
    );
}
