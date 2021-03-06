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
    imageUrl = imageUrl || "/images/photo-camera.png";
    return (
        <div>
            <img
                className={profilePicClass}
                src={imageUrl}
                onClick={toggleFunction}
            />
        </div>
    );
}
