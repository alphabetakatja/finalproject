import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem = <Welcome />;
// a logo component could be done

if (location.pathname != "/welcome") {
    // it means that they're logged in and they wanna see the logo
    elem = <img className="" src="images/logo.png" alt="logo" />;
}

ReactDOM.render(elem, document.querySelector("main"));
