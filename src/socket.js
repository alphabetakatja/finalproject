import * as io from "socket.io-client";

import { chatMessages, chatMessage, wallPosts, addWallPosts } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        // all our dispatches of actions will go here
        // these things emitted by the server

        // chat messages
        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));

        // wall posts
        socket.on("wallPosts", posts => store.dispatch(wallPosts(posts)));

        socket.on("addWallPosts", post => store.dispatch(addWallPosts(post)));
    }
};
