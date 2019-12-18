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
                                        chatMessage.url || "/images/default.png"
                                    }
                                    profilePicClass="chat-photo"
                                />
                                <Link to={`/user/${chatMessage.sender_id}`}>
                                    <h4>
                                        {chatMessage.first} {chatMessage.last}
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
