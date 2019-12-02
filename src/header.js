import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // componentDidMount() {
    //     this.setState({
    //         component: this.props.component,
    //
    //     });
    // }
    render() {
        return (
            <div className="app-header">
                <BrowserRouter>
                    <img
                        className="app-logo"
                        src="/images/skate2.png"
                        alt="logo"
                    />

                    <nav>
                        <ul className="navbar">
                            <li>
                                <a href="#">
                                    <ion-icon name="person"></ion-icon>
                                    profile
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <ion-icon name="people"></ion-icon>
                                    friends
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <ion-icon name="wifi"></ion-icon>
                                    online
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <ion-icon name="chatboxes"></ion-icon>
                                    chat
                                </a>
                            </li>
                            <li>
                                <a href="/logout">
                                    <ion-icon name="log-out"></ion-icon>
                                    logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                </BrowserRouter>
                {this.props.children}
            </div>
        );
    }
}
