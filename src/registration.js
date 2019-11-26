import React from "react";
import axios from "axios";

// req.session.userId = rows[0].id;
// res.json({})

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
            <div className="registration-container">
                {this.state.error && (
                    <div className="error">
                        Oooops! Make sure to fill out all the required fields...
                    </div>
                )}
                <input
                    name="first"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    name="last"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    name="email"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    name="password"
                    onChange={e => this.handleChange(e.target)}
                />
                <button onClick={e => this.submit()}>Register</button>
            </div>
        );
    }
}
