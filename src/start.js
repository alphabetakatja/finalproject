import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem = <Welcome />;

if (location.pathname != "/welcome") {
    // it means that they're logged in and they wanna see the logo
    elem = <img className="" src="images/logo.png" alt="Logo" />;
}

ReactDOM.render(elem, document.querySelector("main"));
