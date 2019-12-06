import React from "react";
import { Link } from "react-router-dom";
// import { FindUsers } from "/findusers";

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
                <img className="app-logo" src="/images/logo-w.png" alt="logo" />

                <nav>
                    <ul className="navbar">
                        <li>
                            <Link to="/">
                                <ion-icon name="person"></ion-icon>
                                profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/friends">
                                <ion-icon name="people"></ion-icon>
                                friends
                            </Link>
                        </li>
                        <li>
                            <Link to="/users">
                                <ion-icon name="search"></ion-icon>
                                find people
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <ion-icon name="chatboxes"></ion-icon>
                                chat
                            </Link>
                        </li>
                        <li>
                            <a href="/logout">
                                <ion-icon name="log-out"></ion-icon>
                                logout
                            </a>
                        </li>
                    </ul>
                </nav>

                {this.props.children}
            </div>
        );
    }
}
