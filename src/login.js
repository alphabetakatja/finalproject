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
            <div className="registration-form">
                <div className="text-box">
                    <h1>Concrete Soldiers</h1>
                    <h3>A skateboarding community</h3>
                </div>
                {this.state.error && (
                    <div className="error">
                        Oooops! Make sure to fill out all the required fields...
                    </div>
                )}
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={e => this.handleChange(e.target)}
                />
                <button className="submit-btn" onClick={e => this.submit(e)}>
                    Login
                </button>
                <div className="register-form_footer">
                    <Link className="login-link" to="/login">
                        Not a member yet? Please register...
                    </Link>
                </div>
            </div>
        );
    }
}
