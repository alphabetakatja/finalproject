import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordError: false,
            failedValidation: ""
        };
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
            <div className="login-form">
                {this.state.error && (
                    <div className="error">
                        Oooops! Make sure to fill out all the required fields...
                    </div>
                )}
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

                    <input
                        className="login-form_input"
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={e => this.handleChange(e.target)}
                    />

                    <input
                        className="login-form_input"
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
                        className="login-form_btn"
                        onClick={e => this.submit(e)}
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }
}
