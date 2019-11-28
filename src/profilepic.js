import React from "react";

// desctructuring instead of passing props as arg
export function ProfilePic({ first, last, imageUrl, toggleFunction }) {
    // console.log("props in ProfilePic: ", props);
    console.log("imageurl", imageUrl);
    imageUrl = imageUrl || "/images/default.png";
    return (
        <div className="profile-pic">
            <div className="profilepic-footer">
                <img src={imageUrl} onClick={toggleFunction} />
            </div>
        </div>
    );
}
