export default function reducer(state = {}, action) {
    console.log("state in reducer started as: ", state);
    if (action.type == "GET_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    }
    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            friends: state.friends.map(friend => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        accepted: true,
                        buttonText: action.buttonText
                    };
                } else {
                    return friend;
                }
            })
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friends: state.friends.filter(friend => friend.id !== action.id)
        };
    }

    if (action.type == "SHOW_LAST_TEN") {
        state = {
            ...state,
            chatMessages: action.chatMessages
        };
    }

    if (action.type == "NEW_MESSAGE") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.chatMessage]
        };
    }

    if (action.type == "SHOW_WALL_POSTS") {
        state = {
            ...state,
            wallPosts: action.wallPosts
        };
    }

    if (action.type == "ADD_WALL_POST") {
        state = {
            ...state,
            wallPosts: [action.addWallPosts, ...state.wallPosts]
        };
    }
    if (action.type == "ONLINE_USERS_LIST") {
        state = {
            ...state,
            onlineUsers: action.onlineUsers
        };
    }

    if (action.type == "JOINED_USER") {
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.joinedUser]
        };
    }

    if (action.type == "USER_LEFT") {
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers].filter(
                user => user.id !== action.userLeft
            )
        };
    }

    console.log("state in reducer ended as: ", state);
    return state;

    // chat - server - db - server - socket - actions.js - reducer - redux state - chat;
}
