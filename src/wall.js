import React, { useState, useEffect } from "react";
// import axios from "./axios";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProfilePic } from "./profilepic";

export function Wall() {
    useEffect(() => {
        console.log("Wall posts have mounted!!!");
    }, []);

    const wallPosts = useSelector(state => state && state.wallPosts);
    console.log("wallPosts: ", wallPosts);

    if (!wallPosts) {
        return null;
    }

    const submitPost = (input, type, path) => {
        input = input.trimEnd();
        if (input.length > 0) {
            socket.emit("My amazing wall post", {
                post: input,
                type: type,
                receiver_id: path === "/" ? "logged in user" : path.slice(-1)
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
            submitPost(e.target.value, "text", location.pathname);
            e.target.value = "";
        }
    };
    return (
        <div className="wall">
            <h1>This is my Wall!</h1>
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
                                <Link to={`/user/${post.id}`}>
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
            <input placeholder="Type something..." onKeyUp={keyCheck}></input>
        </div>
    );
}
