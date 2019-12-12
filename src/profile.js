// profile.js contains last, first, ProfilePic and bio;

import React from "react";
import { ProfilePic } from "./profilepic";
import { BioEditor } from "./bioeditor";
import { Wall } from "./wall";

export function Profile(props) {
    console.log("props in Profile: ", props);
    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="profile-name">
                    <h2>
                        {props.first} {props.last}
                    </h2>
                </div>
                <ProfilePic
                    first={props.first}
                    last={props.last}
                    imageUrl={props.imageUrl}
                    profilePicClass="big-profile"
                    toggleFunction={props.toggleFunction}
                />

                <div className="user-info">
                    <div className="profile-editor">
                        <BioEditor
                            bio={props.bio}
                            updateBio={props.updateBio}
                        />
                    </div>
                </div>
            </div>
            <div className="wall">
                <Wall />
            </div>
        </div>
    );
}
