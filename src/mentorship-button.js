import React, { useState, useEffect } from "react";
import axios from "./axios";

export function MentorshipButton({ otherId, mentor, otherUserStatus, taken }) {
    // console.log("otherId in MentorshipButton: ", otherId);
    // console.log("mentor in MentorshipButton: ", mentor);
    // console.log("checkMentorStatus in MentorshipButton: ", otherUserStatus);
    // console.log("taken in MentorshipButton: ", taken);
    const [buttonText, setButtonText] = useState("");
    // const userRole = mentor;
    // console.log("userRole: ", mentor);

    // const bothMentors = otherUserStatus === true ? true : true;
    // console.log("role in MentorshipButton: ", role);
    // console.log("is the other user taken? ", taken);

    useEffect(() => {
        console.log("mentorship button mounted", otherId, mentor);
        axios.get(`/mentorshipstatus/${otherId}`).then(({ data }) => {
            console.log("response in get mentorshipstatus: ", data);
            setButtonText(data.buttonText);
        });
    }, []);

    function submit() {
        console.log("clicked on the button!!!", buttonText, otherId);
        if (buttonText == "Request Mentorship") {
            console.log("response in post send-mentorship-request: ");
            axios
                .post(`/send-mentorship-request/${otherId}`)
                .then(({ data }) => {
                    setButtonText(data.buttonText);
                });
        }
        if (buttonText == "Accept Mentorship Request") {
            axios
                .post(`/accept-mentorship-request/${otherId}`)
                .then(({ data }) => {
                    console.log(
                        "response in post accept-friend-request: ",
                        data
                    );
                    setButtonText(data.buttonText);
                });
        }

        if (buttonText == "End Mentorship") {
            axios.post(`/end-mentorship/${otherId}`).then(({ data }) => {
                console.log("response in post end-mentorship-request: ", data);
                setButtonText(data.buttonText);
            });
        }
        if (buttonText == "Cancel Mentorship Request") {
            console.log("cancel mentorship req!");
            axios.post(`/end-mentorship/${otherId}`).then(({ data }) => {
                console.log("response in post end-mentorship-request: ", data);
                setButtonText(data.buttonText);
            });
        }
    }

    return (
        <div>
            {buttonText && (
                <button className="edit-btn" onClick={submit}>
                    {buttonText}
                </button>
            )}
        </div>
    );
}
