import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { Provider } from "react-redux";
// import * as io from "socket.io-client";
// const socket = io.connect();

// socket.on('hello',)

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname == "/welcome") {
    // it means that they're logged in and they wanna see the logo
    elem = <Welcome />;
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

// io.connect();
ReactDOM.render(elem, document.querySelector("main"));
