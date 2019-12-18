import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function PrivateChat({ receiverId }) {
    const elemRef = useRef();
    const privateChatMessages = useSelector(
        // state => state && state.privateChatMessages
        state => state && state.privateChatMessages
    );
    console.log("props in PrivateChat: ", receiverId);
    useEffect(() => {
        const receiverId = receiverId;
        socket.emit("privateChat", receiverId);
    }, []);

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [privateChatMessages]);
    //this will be undefined until i have the whole data
    console.log("privateChatMessages: ", privateChatMessages);
    const keyCheck = e => {
        if (e.key == "Enter") {
            let payload = {
                receiverId: receiverId,
                msg: e.target.value
            };
            // console.log("e.key", e.key); // enter
            socket.emit("privateChatMessage", payload);
            e.target.value = "";
        }
    };
    return (
        <div>
            <h1>PRIVATE chatroom</h1>
            <div className="chat-container" ref={elemRef}>
                <p> private chat:</p>
                {privateChatMessages &&
                    privateChatMessages.map(chat => (
                        <div key={chat.id}>
                            <Link to={`/user/${chat.id}`}>
                                <img
                                    src={chat.url}
                                    width="50px"
                                    height="50px"
                                />
                            </Link>
                            <h4>
                                {chat.first} {chat.last} wrote:
                            </h4>
                            <p>{chat.message}</p>
                            <h6>{chat.created_at}</h6>
                        </div>
                    ))}
            </div>
            <textarea
                placeholder="Add message here..."
                onKeyUp={keyCheck}
            ></textarea>
        </div>
    );
}
