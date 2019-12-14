import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit Profile..."
        };
        this.showEditor = this.showEditor.bind(this);
        this.saveEditor = this.saveEditor.bind(this);
    }
    componentDidMount() {
        console.log("props in profile editor: ", this.props);

        if (!this.props.editor) {
            console.log("no editor");
            this.setState(
                {
                    buttonText: "Add your Profile..."
                },
                () => console.log("this.state in profile editor: ", this.state)
            );
        }
    }
    showEditor() {
        console.log("toggleBio is running!");
        this.setState({
            editingMode: !this.state.editingMode
        });
    }
    handleChange(e) {
        console.log("e.target.value", e.target.value);
        this.setState({
            editor: e.target.value
        });
    }
    saveEditor() {
        if (!this.state.editor) {
            this.showEditor();
            return;
        }
        console.log("this.state.editor", this.state.editor);
        axios.post("/edit-profile", this.state).then(({ data }) => {
            console.log("response from post upload ", data);
            console.log("this is post upload: ", this.props);
            this.props.updateProfile(data.editor);
            this.showEditor();
        });
        if (this.state.bio) {
            this.setState({
                buttonText: "Edit your profile..."
            });
        } else {
            this.setState({
                buttonText: "Add your profile..."
            });
        }
    }

    render() {
        let buttonText;
        this.props.editor
            ? (buttonText = "Edit your profile...")
            : (buttonText = "Add your profile...");
        if (this.state.editingMode) {
            return (
                <div>
                    <form className="profile-form" method="POST">
                        <div className="edit-form_content">
                            <input
                                className="edit-form_input"
                                type="text"
                                name="first"
                                placeholder="First Name"
                                onChange={e => this.handleChange(e)}
                                defaultValue={this.props.editor}
                            />
                            <input
                                className="edit-form_input"
                                type="text"
                                name="last"
                                placeholder="Last Name"
                                onChange={e => this.handleChange(e)}
                                defaultValue={this.props.editor}
                            />
                            <input
                                className="edit-form_input"
                                type="text"
                                name="email"
                                placeholder="&#xf0e0; E-mail"
                                onChange={e => this.handleChange(e)}
                                defaultValue={this.props.editor}
                            />
                            <input
                                className="edit-form_input"
                                type="password"
                                name="password"
                                placeholder="Password"
                                pattern="[a-zA-Z0-9]+"
                                onChange={e => this.handleChange(e)}
                                defaultValue={this.props.editor}
                            />
                            <input
                                className="edit-form_input"
                                type="text"
                                name="age"
                                placeholder="Age"
                                onChange={e => this.handleChange(e)}
                                defaultValue={this.props.editor}
                            />
                            <div>
                                <ion-icon name="logo-linkedin"></ion-icon>
                                <input
                                    className="edit-form_input"
                                    type="text"
                                    name="url"
                                    placeholder="LinkedIn"
                                    onChange={e => this.handleChange(e)}
                                    defaultValue={this.props.editor}
                                />
                            </div>
                            <div>
                                <ion-icon name="logo-github"></ion-icon>
                                <input
                                    className="edit-form_input"
                                    type="text"
                                    name="url"
                                    placeholder="Github"
                                    onChange={e => this.handleChange(e)}
                                    defaultValue={this.props.editor}
                                />
                            </div>

                            <select
                                className="register-form_input"
                                onChange={e => this.handleChange(e.target)}
                            >
                                <option value="">
                                    --Please select a max of 2 topics you would
                                    like your mentor to help you with--
                                </option>
                                <option value="webdev">Web Development</option>
                                <option value="mobiledev">
                                    Mobile Development
                                </option>
                                <option value="javadev">
                                    Java Development
                                </option>
                                <option value="python">
                                    Python Data Science
                                </option>
                                <option value="itnetworking">
                                    IT & Networking
                                </option>
                                <option value="interviews">
                                    Interviews & Communication
                                </option>
                                <option value="joborientation">
                                    Job Orientation
                                </option>
                                <option value="cvpresentation">
                                    Cv & Personal Presentation
                                </option>
                            </select>
                            <button
                                className="edit-form_btn"
                                type="submit"
                                onClick={this.saveBio}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="bio-editor">
                    <p className="new-line">{this.props.editor}</p>
                    <div className="bioeditor-icon">
                        <img
                            onClick={this.showEditor}
                            className="bioeditor-btn"
                            src="./images/pencil.png"
                        />
                        <p>{buttonText}</p>
                    </div>
                </div>
            );
        }
    }
}
