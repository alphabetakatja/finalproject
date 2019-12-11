import axios from "./axios";

export async function getFriendsWannabes() {
    const { data } = await axios.get("/api/friends");
    console.log("data in get friends", data);
    return {
        type: "GET_FRIENDS",
        friends: data
    };
}

export async function acceptFriendRequest(otherId) {
    console.log("Accept request btn clicked!");
    const { data } = await axios.post(`/accept-friend-request/${otherId}`);
    console.log("data in accept friend request", data);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id: otherId,
        buttonText: data.buttonText
    };
}

export async function unfriend(otherId) {
    console.log("Unfriend btn clicked!");
    const { data } = await axios.get(`/end-friendship/${otherId}`);
    console.log("data in unfriend", data);
    return {
        type: "UNFRIEND",
        id: otherId,
        buttonText: data.buttonText
    };
}

export async function chatMessages(msgs) {
    console.log("Last 10 messages rendered!", msgs);

    return {
        type: "SHOW_LAST_TEN",
        chatMessages: msgs
    };
}

export async function chatMessage(message) {
    return {
        type: "NEW_MESSAGE",
        chatMessage: message
    };
}

export async function wallPosts(posts) {
    console.log("Last 10 posts rendered!", posts);
    return {
        type: "SHOW_WALL_POSTS",
        wallPosts: posts
    };
}
