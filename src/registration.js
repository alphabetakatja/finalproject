import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordError: false,
            failedValidation: ""
        };
    }
    submit() {
        axios
            .post("/register", {
                email: this.state.email,
                password: this.state.password,
                last: this.state.last,
                first: this.state.first
            })
            .then(({ data }) => {
                console.log("data in register: ", data);
                if (data.success) {
                    console.log("No error here!");
                    // one way is: location.href = '/'
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.value
        });

        if (this.state.password && this.state.password.length < 4) {
            this.setState({
                passwordError: true,
                failedValidation: "invalidPassword"
            });
        }
        if (this.state.password && this.state.password.length >= 4) {
            this.setState({
                passwordError: false
            });
        }
    }
    render() {
        return (
            <div className="registration-page">
                <div className="welcome-header">
                    <h3>
                        Femmetor || A mentorship platform for womxn developers
                    </h3>
                </div>
                <div className="welcome-main">
                    <div className="welcome-text">
                        <h3>
                            FemmeTor helps you grow by exchanging knowledge
                            <br /> and experiences with peers.
                        </h3>
                        <h4>How does it work?</h4>
                        <ul>
                            <li>
                                <img
                                    className="flaticon"
                                    src="./images/clipboard.png"
                                />
                                <p>Register & join the community</p>
                            </li>
                            <li>
                                <img
                                    className="flaticon"
                                    src="./images/frame.png"
                                />
                                <p>Create a profile</p>
                            </li>
                            <li>
                                <img
                                    className="flaticon"
                                    src="./images/profile.png"
                                />
                                <p>Match with a mentor</p>
                            </li>
                            <li>
                                <img
                                    className="flaticon"
                                    src="./images/message.png"
                                />
                                <p>Exchange messages</p>
                            </li>
                            <li>
                                <img
                                    className="flaticon"
                                    src="./images/learning.png"
                                />
                                <p>Start learning</p>
                            </li>
                            <li>
                                <img
                                    className="flaticon"
                                    src="./images/mortarboard.png"
                                />
                                <p>Become a mentor</p>
                            </li>
                        </ul>
                    </div>
                    {this.state.error && (
                        <div className="error">
                            Oooops! Make sure to fill out all the required
                            fields...
                        </div>
                    )}
                    <div className="register-form">
                        <div className="logo-container">
                            <img src="/images/logo-w.png" alt="logo" />
                        </div>
                        <div className="register-form_content">
                            <p>
                                <Link className="log-in_link" to="/login">
                                    Login
                                </Link>
                                ||
                                <Link className="sign-up_link" to="/">
                                    Register
                                </Link>
                            </p>
                            <input
                                className="register-form_input"
                                type="text"
                                name="first"
                                placeholder="First Name"
                                onChange={e => this.handleChange(e.target)}
                            />
                            <input
                                className="register-form_input"
                                type="text"
                                name="last"
                                placeholder="Last Name"
                                onChange={e => this.handleChange(e.target)}
                            />
                            <input
                                className="register-form_input"
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={e => this.handleChange(e.target)}
                            />
                            <input
                                className="register-form_input"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={e => this.handleChange(e.target)}
                            />
                            <div>
                                {this.state.passwordError && (
                                    <div className="error">
                                        Minimum 5 characters required...
                                    </div>
                                )}
                            </div>
                            <button
                                className="register-form_btn"
                                onClick={e => this.submit(e)}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
