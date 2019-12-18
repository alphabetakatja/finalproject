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

// ***** CHAT MESSAGES *****
// export async function setUser(id) {
//     return {
//         type: "USER_LOGGED",
//         userId: id
//     };
// }

export async function chatMessages(msgs) {
    // console.log("Last 10 messages rendered!", msgs);
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

// ******* PRIVATE CHAT ***********
export async function privateChatMessages(pmsgs) {
    return {
        type: "SHOW_P_MSGS",
        pmsgs: pmsgs
    };
}
export async function privateChatMessage(pmsg) {
    return {
        type: "GOT_P_MSG",
        pmsg: pmsg
    };
}

// ***** WALL POSTS *****
export async function wallPosts(posts) {
    console.log("Last 10 posts rendered!", posts);
    return {
        type: "SHOW_WALL_POSTS",
        wallPosts: posts
    };
}

export async function addWallPosts(post) {
    console.log("A post has been added!", post);
    return {
        type: "ADD_WALL_POST",
        addWallPosts: post
    };
}

// ***** ONLINE USERS *****

export function displayOnlineUsers(onlineUsersList) {
    return {
        type: "ONLINE_USERS_LIST",
        onlineUsers: onlineUsersList
    };
}

export function displayJoinedUser(joinedUser) {
    console.log("userWhoJoined..", joinedUser);
    return {
        type: "JOINED_USER",
        joinedUser: joinedUser
    };
}

export function removeUserLeft(userLeft) {
    console.log("userWhoLeft", userLeft);
    return {
        type: "USER_LEFT",
        userLeft: userLeft
    };
}
