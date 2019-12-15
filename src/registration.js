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
                first: this.state.first,
                role: this.state.role
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
        console.log("input choice: ", inputElement.value);
        this.setState(
            {
                [inputElement.name]: inputElement.value
            },
            () => {
                console.log("this.state: ", this.state);
            }
        );

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
            <div className="register-form">
                {this.state.error && (
                    <div className="error">
                        Oooops! Make sure to fill out all the required fields...
                    </div>
                )}
                <div className="register-form_content">
                    <p>
                        <Link className="log-in_link" to="/login">
                            LOGIN
                        </Link>
                        | |
                        <Link className="sign-up_link" to="/">
                            REGISTER
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
                    <select
                        className="register-form_input"
                        name="role"
                        id="role-select"
                        onChange={e => this.handleChange(e.target)}
                    >
                        <option value="">--Please choose a role--</option>
                        <option value="mentor">Mentor</option>
                        <option value="mentee">Mentee</option>
                    </select>
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
        );
    }
}
