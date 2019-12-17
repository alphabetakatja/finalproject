import React, { useState, useEffect } from "react";
import axios from "./axios";

export function MentorshipButton({ otherId }) {
    console.log("otherId in FriendshipButton: ", otherId);
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        console.log("mentorship button mounted", otherId);
        axios.get(`/mentorshipstatus/${otherId}`).then(({ data }) => {
            console.log("response in get mentorshipstatus: ", data);
            setButtonText(data.buttonText);
        });
    }, []);

    function submit() {
        console.log("clicked on the button!!!", buttonText, otherId);
        if (buttonText == "Request Mentorship") {
            axios
                .post(`/send-mentorship-request/${otherId}`)
                .then(({ data }) => {
                    console.log(
                        "response in post send-mentorship-request: ",
                        data
                    );
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
            axios.post(`/end-mentorship/${otherId}`).then(({ data }) => {
                console.log("response in post end-mentorship-request: ", data);
                setButtonText(data.buttonText);
            });
        }
    }

    return (
        <div>
            <button className="" onClick={submit}>
                {buttonText}
            </button>
        </div>
    );
}
