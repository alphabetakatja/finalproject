export default function reducer(state = {}, action) {
    console.log("state in reducer started as: ", state);
    if (action.type == "GET_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    }
    if (action.type == "ACCEPT_FRIEND_REQUEST" || action.type == "UNFRIEND") {
        state = {
            ...state,
            friends: state.friends.map(friend => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        accepted: action.type == "ACCEPT_FRIEND_REQUEST"
                    };
                } else {
                    return friend;
                }
            })
        };
    }
    console.log("state in reducer ended as: ", state);
    return state;
}
