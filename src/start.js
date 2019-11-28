import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

let elem;
// a logo component could be done

if (location.pathname == "/welcome") {
    // it means that they're logged in and they wanna see the logo
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
