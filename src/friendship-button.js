import React, { useState, useEffect } from "react";
import axios from "./axios";

export function FriendshipButton({ otherId }) {
    console.log("otherId in FriendshipButton: ", otherId);
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        console.log("friendship button mounted", otherId);
        axios.get(`/friendshipstatus/${otherId}`).then(({ data }) => {
            console.log("response in get friendshipstatus: ", data);
            setButtonText(data.buttonText);
        });
    }, []);

    function submit() {
        console.log("clicked on the button!!!", buttonText);
        // we can either do the logic here and then send to one of different 3 post ROUTES
        // or we can make a post route to 1 route, and the route does the logic to determine
        // what type of query to make
    }

    return (
        <div>
            <button className="edit-btn" onClick={submit}>
                {buttonText}
            </button>
        </div>
    );
}
