import React from "react";
import { ProfilePic } from "./profilepic";
import { BioEditor } from "./bioeditor";

export function Profile(props) {
    console.log("props in Profile: ", props);
    return (
        <div className="profile-container">
            <ProfilePic
                first={props.first}
                last={props.last}
                imageUrl={props.imageUrl}
                profilePicClass="big-profile"
                toggleFunction={props.toggleFunction}
            />

            <div className="user-info">
                <div className="profile-name">
                    <h2>
                        {props.first} {props.last}
                    </h2>
                </div>
                <div className="profile-editor">
                    <BioEditor bio={props.bio} updateBio={props.updateBio} />
                </div>
            </div>
        </div>
    );
}

{
    role == false && <div className="mentor">MENTEE</div>;
}
{
    mentor && role == true && (
        <div className="mentors">You are both mentors</div>
    );
}
{
    !mentor && role == true && (
        <button className="edit-btn" onClick={submit}>
            {buttonText}
        </button>
    );
}
{
    mentor && role == false && (
        <button className="edit-btn" onClick={submit}>
            Accept Mentorship Request
        </button>
    );
}
{
    mentor && role == false && taken == true && (
        <button className="edit-btn" onClick={submit}>
            End Mentorship Request
        </button>
    );
}

{
    mentor ? (
        ""
    ) : (
        <>
            {otherUserStatus && (
                <button className="edit-btn" onClick={submit}>
                    {buttonText}
                </button>
            )}
        </>
    );
}
{
    buttonText == "Cancel Mentorship Request" ? (
        <>
            {!otherUserStatus && (
                <button className="edit-btn" onClick={submit}>
                    {buttonText}
                </button>
            )}
        </>
    ) : (
        ""
    );
}
