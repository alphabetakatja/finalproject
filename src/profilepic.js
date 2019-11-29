import React from "react";

// desctructuring instead of passing props as arg
export function ProfilePic({
    first,
    last,
    imageUrl,
    toggleFunction,
    profilePicClass
}) {
    // console.log("props in ProfilePic: ", props);
    console.log("imageurl", imageUrl);
    imageUrl = imageUrl || "/images/default.png";
    return (
        <img
            className={profilePicClass}
            src={imageUrl}
            onClick={toggleFunction}
        />
    );
}
