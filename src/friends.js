// when the compponent mounts we're gonna dispatch an action
// it's gonna be called in the component itself
// axios request in actions.js, not in the component
// from the server we're sending a response back to the actions creator (actions.js)
// once we're back there we're able to return the action object (that describes the change we wanna make to redux)

// one big array of friends and wannabes
// the friends component will have to

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProfilePic } from "./profilepic";

import { getFriendsWannabes, acceptFriendRequest, unfriend } from "./actions";

export function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(state => {
        return state.friends;
    });

    useEffect(() => {
        dispatch(getFriendsWannabes());
    }, []);
    if (!friends) {
        return null;
    }

    return (
        <div className="friends-list">
            {friends.map(friend => (
                <div key={friend.id} className="profile-container">
                    <ProfilePic
                        first={friend.first}
                        last={friend.last}
                        imageUrl={friend.url || "/images/default.png"}
                        profilePicClass="recent-profile"
                    />
                    <div className="user-info">
                        <div className="profile-name">
                            <Link to={`/user/${friend.id}`}>
                                <p>
                                    {friend.first} {friend.last}
                                </p>
                            </Link>
                        </div>
                        <button></button>
                    </div>
                </div>
            ))}
        </div>
    );
}
