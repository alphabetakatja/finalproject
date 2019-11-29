import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
            //this.[inputElement.name] = inputElement.value
        });
    }
    render() {
        return (
            <div className="registration-page">
                <div className="text-box">
                    <h1>Concrete Soldiers</h1>
                    <h3>A skateboarding community</h3>
                </div>
                {this.state.error && (
                    <div className="error">
                        Oooops! Make sure to fill out all the required fields...
                    </div>
                )}
                <div className="register-form">
                    <div className="logo-container">
                        <img src="/images/skate2.png" alt="logo" />
                    </div>
                    <div className="register-form_content">
                        <h4>Create a new account</h4>
                        <p>It`s quick and easy</p>
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
                        <button
                            className="register-form_btn"
                            onClick={e => this.submit(e)}
                        >
                            Register
                        </button>
                    </div>
                    <div className="register-form_footer">
                        <Link className="log-in_link" to="/login">
                            Already a member? Please log in...
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
