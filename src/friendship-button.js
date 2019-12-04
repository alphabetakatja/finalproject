import React, { useState, useEffect } from "react";
import axios from "./axios";

export function FriendshipButton({ otherId }) {
    console.log("otherId in FriendshipButton: ", otherId);
    const [buttonText, setButtonText] = useState("Make friendship request");

    useEffect(() => {
        console.log("friendship button mounted", otherId);
        axios.get(`/friendshipstatus/${otherId}`).then(resp => {
            console.log("response in get friendshipstatus: ", resp.data);
            setButtonText(resp.data.buttonText);
        });
    }, []);

    return (
        <div>
            <button className="edit-btn">{buttonText}</button>
        </div>
    );
}
