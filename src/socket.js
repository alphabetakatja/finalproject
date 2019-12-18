import * as io from "socket.io-client";

import {
    chatMessages,
    chatMessage,
    wallPosts,
    addWallPosts,
    displayOnlineUsers,
    displayJoinedUser,
    removeUserLeft,
    privateChatMessage,
    privateChatMessages
} from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        // all our dispatches of actions will go here
        // these things emitted by the server

        // chat messages
        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));

        // private chat messages
        socket.on("privateChatMessages", pmsgs =>
            store.dispatch(privateChatMessages(pmsgs))
        );
        socket.on("privateChatMessage", pmsg =>
            store.dispatch(privateChatMessage(pmsg))
        );

        // wall posts
        socket.on("wallPosts", posts => store.dispatch(wallPosts(posts)));

        socket.on("addWallPosts", post => store.dispatch(addWallPosts(post)));

        // online users
        socket.on("onlineUsers", onlineUsersList => {
            // console.log("listofOnlineUsers", onlineUsersList);
            store.dispatch(displayOnlineUsers(onlineUsersList));
        });

        socket.on("userJoined", joinedUser => {
            console.log("listofOnlineUsers", joinedUser);
            store.dispatch(displayJoinedUser(joinedUser));
        });

        socket.on("userLeft", userLeft => {
            store.dispatch(removeUserLeft(userLeft));
        });
    }
};
