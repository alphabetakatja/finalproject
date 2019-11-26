import React from "react";

import Register from "./registration";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="welcome-container">
                <img src="/images/logo.png" alt="logo" />
                <Register />
            </div>
        );
    }
}
