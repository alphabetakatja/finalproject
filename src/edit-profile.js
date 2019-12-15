import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        let editor = props.editor || {};
        console.log("SDFSDFSDFSDFSDFSDFSDFSDF");
        console.log(editor);
        console.log(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit Profile...",
            editor: {
                first: editor.first || null,
                last: editor.last || null,
                email: editor.email || null,
                password: editor.password || null,
                linkedin: editor.linkedin || null,
                github: editor.github || null
            }
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
        console.log("toggleEditor is running!");
        this.setState({
            editingMode: !this.state.editingMode
        });
    }
    handleChange(inputElement) {
        console.log("e.target.value", inputElement.value);
        this.setState(
            {
                editor: {
                    ...this.state.editor,
                    [inputElement.name]: inputElement.value
                }
            },
            () => {
                console.log("this.state: ", this.state);
            }
        );
    }
    saveEditor() {
        if (!this.state.editor) {
            this.showEditor();
            return;
        }
        console.log("this.state.editor", this.state.editor);

        if (this.state.editor) {
            this.setState({
                buttonText: "Edit your profile..."
            });
            // CALL EDIT PROFILE API HERE
            axios
                .post("./edit-profile", {
                    email: this.props.email,
                    password: this.state.editor.password,
                    last: this.state.editor.last,
                    first: this.state.editor.first,
                    linkedin: this.state.editor.linkedin,
                    github: this.state.editor.github,
                    tag: this.state.editor.tag
                })
                .then(({ data }) => {
                    console.log("response from post upload ", data);
                    console.log("this is post upload: ", this.props);
                    this.props.updateProfile(data.editor);
                    this.showEditor();
                });
        } else {
            this.setState({
                buttonText: "Add your profile..."
            });
            axios
                .post("/add-profile", {
                    email: this.props.email,
                    password: this.state.editor.password,
                    last: this.state.editor.last,
                    first: this.state.editor.first,
                    linkedin: this.state.editor.linkedin,
                    github: this.state.editor.github,
                    tag: this.state.editor.tag
                })
                .then(({ data }) => {
                    console.log("response from post upload ", data);
                    console.log("this is post upload: ", this.props);
                    this.props.updateProfile(data.editor);
                    this.showEditor();
                });
        }
    }

    render() {
        let buttonText;
        this.props.editor || this.state.editor
            ? (buttonText = "Edit your profile...")
            : (buttonText = "Add your profile...");
        console.log("FUCK THAT LAZY SLOTH");
        console.log(this.state);
        console.log(this.props);
        if (this.state.editingMode) {
            return (
                <div>
                    <div className="edit-form_content">
                        <input
                            className="edit-form_input"
                            type="text"
                            name="first"
                            placeholder="First Name"
                            onChange={e => this.handleChange(e.target)}
                            defaultValue={this.state.editor.first}
                        />
                        <input
                            className="edit-form_input"
                            type="text"
                            name="last"
                            placeholder="Last Name"
                            onChange={e => this.handleChange(e.target)}
                            defaultValue={this.state.editor.last}
                        />
                        <input
                            className="edit-form_input"
                            type="text"
                            name="email"
                            disabled={true}
                            placeholder="&#xf0e0; E-mail"
                            defaultValue={this.props.email}
                        />
                        <input
                            className="edit-form_input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            pattern="[a-zA-Z0-9]+"
                            onChange={e => this.handleChange(e.target)}
                            defaultValue={this.state.editor.password}
                        />
                        <input
                            className="edit-form_input"
                            type="text"
                            name="age"
                            placeholder="Age"
                            onChange={e => this.handleChange(e.target)}
                            defaultValue={this.state.editor.age}
                        />
                        <div>
                            <ion-icon name="logo-linkedin"></ion-icon>
                            <input
                                className="edit-form_input"
                                type="text"
                                name="linkedin"
                                placeholder="LinkedIn"
                                onChange={e => this.handleChange(e.target)}
                                defaultValue={this.state.editor.linkedin}
                            />
                        </div>
                        <div>
                            <ion-icon name="logo-github"></ion-icon>
                            <input
                                className="edit-form_input"
                                type="text"
                                name="github"
                                placeholder="Github"
                                onChange={e => this.handleChange(e.target)}
                                defaultValue={this.state.editor.github}
                            />
                        </div>

                        <select
                            className="register-form_input"
                            name="tag"
                            onChange={e => this.handleChange(e.target)}
                        >
                            <option value="">
                                --Please select a max of 2 topics you would like
                                your mentor to help you with--
                            </option>
                            <option value="Web Development">
                                Web Development
                            </option>
                            <option value="Mobile Development">
                                Mobile Development
                            </option>
                            <option value="Java Development">
                                Java Development
                            </option>
                            <option value="Python Data Science">
                                Python Data Science
                            </option>
                            <option value="IT & Networking">
                                IT & Networking
                            </option>
                            <option value="Interviews & Communication">
                                Interviews & Communication
                            </option>
                            <option value="Job Orientation">
                                Job Orientation
                            </option>
                            <option value="Cv & Personal Presentation">
                                Cv & Personal Presentation
                            </option>
                        </select>
                        <button
                            className="edit-form_btn"
                            type="submit"
                            onClick={this.saveEditor}
                        >
                            Save
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="profile-editor">
                    <ul>
                        <li>
                            <ion-icon name="logo-linkedin"></ion-icon>
                            <p className="new-line">
                                {this.state.editor.linkedin}
                            </p>
                        </li>
                        <li>
                            <ion-icon name="logo-github"></ion-icon>
                            <p className="new-line">
                                {this.state.editor.github}
                            </p>
                        </li>
                        <li>
                            <p className="new-line">{this.state.editor.tag}</p>
                        </li>
                    </ul>
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
