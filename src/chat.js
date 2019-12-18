import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProfilePic } from "./profilepic";

export function Chat(props) {
    console.log("props in Chat component: ", props);
    const elemRef = useRef();

    const chatMessages = useSelector(state => state && state.chatMessages);
    console.log("chatMessages: ", chatMessages);
    const userId = useSelector(state => state && state.userId);

    useEffect(() => {
        // console.log("chat mounted!!!");
        // console.log("elemRef: ", elemRef.current);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value: ", e.target.value);
            console.log("e.key: ", e.key);
            // 1st arg is the name of the event that we're emitting
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chat">
            <h3>Chat Room - talk to your buddies</h3>
            <div className="chat-container" ref={elemRef}>
                {chatMessages && (
                    <div>
                        {chatMessages.map(chatMessage => (
                            <div
                                key={chatMessage.id}
                                className={`message-box ${
                                    chatMessage.sender_id === userId
                                        ? "message-box--left"
                                        : "message-box--right"
                                }`}
                            >
                                <div className="message-sender">
                                    <ProfilePic
                                        first={chatMessage.first}
                                        last={chatMessage.last}
                                        imageUrl={
                                            chatMessage.url ||
                                            "/images/default.png"
                                        }
                                        profilePicClass="chat-photo"
                                    />
                                    <Link to={`/user/${chatMessage.sender_id}`}>
                                        <h4>
                                            {chatMessage.first}{" "}
                                            {chatMessage.last}
                                        </h4>
                                    </Link>
                                </div>
                                <div className="message-text">
                                    <p>{chatMessage.message}</p>
                                    <p>
                                        {new Date(
                                            chatMessage.created_at
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <input
                placeholder="Say hello, ask for help or just post what's new on your mind..."
                onKeyUp={keyCheck}
            ></input>
        </div>
    );
}
