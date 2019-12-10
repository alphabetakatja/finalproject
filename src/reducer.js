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
    console.log("state in reducer ended as: ", state);
    return state;
}

// chat - server - db - server - socket - actions.js - reducer - redux state - chat;
