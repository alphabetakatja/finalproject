import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
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
            //this.[inputElement.name] = inputElement.value
        });
    }
    render() {
        return (
            <div className="login-page">
                <div className="welcome-header">
                    <h3>
                        Femmetor || A mentorship platform for womxn developers
                    </h3>
                </div>
                {this.state.error && (
                    <div className="error">
                        Oooops! Make sure to fill out all the required fields...
                    </div>
                )}
                <div className="login-form">
                    <div className="logo-container">
                        <img src="/images/logo1.png" alt="logo" />
                    </div>
                    <div className="login-form_content">
                        <div className="login-form_header">
                            <Link className="log-in_link" to="/login">
                                Login
                            </Link>
                            ||
                            <Link className="sign-up_link" to="/">
                                Register
                            </Link>
                        </div>
                        <label>Email</label>
                        <input
                            className="login-form_input"
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={e => this.handleChange(e.target)}
                        />
                        <label>Password</label>
                        <input
                            className="login-form_input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={e => this.handleChange(e.target)}
                        />
                        <button
                            className="login-form_btn"
                            onClick={e => this.submit(e)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
