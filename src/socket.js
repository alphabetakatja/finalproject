import * as io from "socket.io-client";

import { chatMessages, chatMessage, wallPosts } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        // all our dispatches of actions will go here
        // these things emitted by the server

        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));

        socket.on("wallPosts", posts => store.dispatch(wallPosts(posts)));
    }
};
