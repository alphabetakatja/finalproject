import React, { useEffect } from "react";
// import axios from "./axios";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProfilePic } from "./profilepic";

export function Wall() {
    const wallPosts = useSelector(state => state && state.wallPosts);
    console.log("wallPosts: ", wallPosts);
    let otherUser = location.pathname.replace("/user/", "");
    if (!wallPosts) {
        return null;
    }
    useEffect(() => {
        renderPosts(otherUser);
    }, []);
    const renderPosts = path => {
        socket.emit("load profile", {
            receiver_id: path === "/" ? "logged in user" : path
        });
    };
    const submitPost = (input, type, path) => {
        input = input.trimEnd();
        if (input.length > 0) {
            socket.emit("My amazing wall post", {
                post: input,
                type: type,
                receiver_id: path === "/" ? "logged in user" : path
            });
        } else {
            return;
        }
    };
    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            // console.log("e.target.value: ", e.target.value);
            // console.log("e.key: ", e.key);
            // 1st arg is the name of the event that we're emitting
            // console.log("location.pathname: ", location.pathname);
            submitPost(e.target.value, "text", otherUser);
            e.target.value = "";
        }
    };
    return (
        <div className="wall">
            <input
                placeholder="Say hello or just post what's new on your mind..."
                onKeyUp={keyCheck}
            ></input>
            <div className="wall-container">
                {wallPosts &&
                    wallPosts.map(post => (
                        <div className="message-box" key={post.id}>
                            <div className="message-sender">
                                <ProfilePic
                                    first={post.first}
                                    last={post.last}
                                    imageUrl={post.url || "/images/default.png"}
                                    profilePicClass="chat-photo"
                                />
                                <Link to={`/user/${post.sender_id}`}>
                                    <h4>
                                        {post.first} {post.last}
                                    </h4>
                                </Link>
                            </div>
                            <div className="message-text">
                                <p>{post.post}</p>
                                <p>
                                    {new Date(post.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
