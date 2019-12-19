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

export function Mentees() {
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
            <div className="friend-name">
                {wannabes && friends.length == 0 ? (
                    <h3>No friends...</h3>
                ) : (
                    <h3>{friends.length} friend/s</h3>
                )}
            </div>
            <div className="friendcol">
                {friends.map(friend => (
                    <div key={friend.id} className="friend-container">
                        <div className="profile-name">
                            <Link to={`/user/${friend.id}`}>
                                <h4>
                                    {friend.first} {friend.last}
                                </h4>
                            </Link>
                        </div>
                        <ProfilePic
                            first={friend.first}
                            last={friend.last}
                            imageUrl={friend.url || "/images/default.png"}
                            profilePicClass="recent-profile"
                        />

                        <div className="buttons">
                            <button
                                className="edit-btn"
                                onClick={() => dispatch(unfriend(friend.id))}
                            >
                                End friendship
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="friend-name">
                {friends && wannabes.length == 0 ? (
                    <h3>No pending requests...</h3>
                ) : (
                    <h3>{wannabes.length} pending request/s</h3>
                )}
            </div>
            <div className="friendcol">
                {wannabes.map(wannabe => (
                    <div key={wannabe.id} className="friend-container">
                        <div className="profile-name">
                            <Link to={`/user/${wannabe.id}`}>
                                <h3>
                                    {wannabe.first} {wannabe.last}
                                </h3>
                            </Link>
                        </div>
                        <ProfilePic
                            first={wannabe.first}
                            last={wannabe.last}
                            imageUrl={wannabe.url || "/images/default.png"}
                            profilePicClass="recent-profile"
                        />

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
                ))}
            </div>
        </div>
    );
}
