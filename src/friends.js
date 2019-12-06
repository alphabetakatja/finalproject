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
    // let wannabes;
    const friends = useSelector(state => {
        return (
            state.friends &&
            state.friends.filter(friend => friend.accepted == true)
        );
    });
    const wannabes = useSelector(state => {
        return (
            state.friends &&
            state.friends.filter(friend => friend.accepted == false)
        );
    });
    // console.log("friends: ", friends);
    // console.log("wannabes: ", wannabes);
    useEffect(() => {
        dispatch(getFriendsWannabes());
    }, []);
    if (!friends) {
        return null;
    }

    return (
        <div className="friends-list">
            <h5>Friends:</h5>
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
                        <div className="buttons">
                            <button
                                className="edit-btn"
                                onClick={() => dispatch(unfriend(friend.id))}
                            >
                                End friendship
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <h5>Wannabes:</h5>
            {wannabes.map(wannabe => (
                <div key={wannabe.id} className="profile-container">
                    <ProfilePic
                        first={wannabe.first}
                        last={wannabe.last}
                        imageUrl={wannabe.url || "/images/default.png"}
                        profilePicClass="recent-profile"
                    />
                    <div className="user-info">
                        <div className="profile-name">
                            <Link to={`/user/${wannabe.id}`}>
                                <p>
                                    {wannabe.first} {wannabe.last}
                                </p>
                            </Link>
                        </div>
                        <div className="buttons">
                            <button
                                className="edit-btn"
                                onClick={() =>
                                    dispatch(acceptFriendRequest(wannabe.id))
                                }
                            >
                                Accept friend request
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
