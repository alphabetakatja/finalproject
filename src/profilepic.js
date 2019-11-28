import React from "react";

// desctructuring instead of passing props as arg
export function ProfilePic({ first, last, imageUrl, toggleFunction }) {
    // console.log("props in ProfilePic: ", props);
    console.log("imageurl", imageUrl);
    imageUrl = imageUrl || "/images/default.png";
    return (
        <div className="profile-pic">
            <img src={imageUrl} onClick={toggleFunction} />
            <h2>
                {first}
                {last}
            </h2>
        </div>
    );
}
