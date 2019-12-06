import axios from "axios";

export async function getFriendsWannabes() {
    const { data } = await axios.get("/api/friends");
    console.log("data in get friends", data);
    return {
        type: "GET_FRIENDS",
        friends: data
    };
}

export async function acceptFriendRequest(otherId) {
    await axios.post(`/accept-friend-request/${otherId}`);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        otherId
    };
}

export async function unfriend(otherId) {
    await axios.get(`/end-friendship/${otherId}`);
    return {
        type: "UNFRIEND",
        otherId
    };
}
