import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { socket } from "./socket";
import { ProfilePic } from "./profilepic";

export function OnlineUsers() {
    const onlineUsers = useSelector(state => state && state.onlineUsers);

    console.log("list of online users in component: ", onlineUsers);

    if (!onlineUsers) {
        return null;
    }

    return (
        <div className="online-users">
            <h2>online users</h2>
            <div className="online-container">
                {onlineUsers &&
                    onlineUsers.map(onlineUser => {
                        return (
                            <div className="r" key={onlineUser.id}>
                                <div nameClass="online-sign"></div>
                                <div className="user-info">
                                    <Link to={`/user/${onlineUser.id}`}>
                                        <ProfilePic
                                            first={onlineUser.first}
                                            last={onlineUser.last}
                                            imageUrl={
                                                onlineUser.url ||
                                                "/images/default.png"
                                            }
                                            profilePicClass="chat-photo"
                                        />
                                    </Link>
                                    <p>
                                        {onlineUser.first} {onlineUser.last}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
