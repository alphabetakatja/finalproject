import React from "react";

// desctructuring instead of passing props as arg
export function ProfilePic({ first, last, imageUrl }) {
    // console.log("props in ProfilePic: ", props);
    imageUrl = imageUrl || "/images/default.jpg";
    return (
        <div>
            <h2>
                I am the profile pic! {first}
                {last}
            </h2>
            <img src={imageUrl} />
        </div>
    );
}
