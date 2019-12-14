import React, { useEffect } from "react";
import { ProfilePic } from "./profilepic";
import { BioEditor } from "./bioeditor";
// import { Wall } from "./wall";
import { EditProfile } from "./edit-profile";
// import { socket } from "./socket";
// import { OnlineUsers } from "./online-users";

export function Profile({
    id,
    first,
    last,
    email,
    imageUrl,
    toggleFunction,
    bio,
    updateBio,
    editor,
    updateProfile
}) {
    console.log("props in Profile: ", {
        id,
        first,
        last,
        email,
        imageUrl,
        toggleFunction,
        bio,
        updateBio,
        editor,
        updateProfile
    });

    // useEffect(() => {
    //     socket.emit("load profile", id);
    // }, [id]);
    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="profile-name">
                    <h2>
                        {first} {last}
                    </h2>
                </div>
                <ProfilePic
                    first={first}
                    last={last}
                    imageUrl={imageUrl}
                    profilePicClass="big-profile"
                    toggleFunction={toggleFunction}
                />

                <div className="user-info">
                    <div className="profile-editor">
                        <BioEditor bio={bio} updateBio={updateBio} />
                    </div>
                    <div className="profile-editor">
                        <EditProfile
                            editor={editor}
                            email={email}
                            updateProfile={updateProfile}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
