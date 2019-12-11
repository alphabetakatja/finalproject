import React, { useState, useEffect } from "react";
// import axios from "./axios";
// import { socket } from "./socket";
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
                                <p>{post.messages}</p>
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
