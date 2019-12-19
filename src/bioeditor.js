import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit Bio"
        };
        this.showBio = this.showBio.bind(this);
        this.saveBio = this.saveBio.bind(this);
    }
    componentDidMount() {
        console.log("props in Bio editor: ", this.props);

        if (!this.props.bio) {
            console.log("no bio");
            this.setState(
                {
                    buttonText: "Add your Bio"
                },
                () => console.log("this.state in bioeditor: ", this.state)
            );
        }
    }
    showBio() {
        console.log("toggleBio is running!");
        this.setState({
            editingMode: !this.state.editingMode
        });
    }
    handleChange(e) {
        console.log("e.target.value", e.target.value);
        this.setState({
            bio: e.target.value
        });
    }
    saveBio() {
        if (!this.state.bio) {
            this.showBio();
            return;
        }
        console.log("this.state.bio", this.state.bio);
        axios.post("/bio", this.state).then(({ data }) => {
            console.log("response from post upload ", data);
            console.log("this is post upload: ", this.props);
            this.props.updateBio(data.bio);
            this.showBio();
        });
        if (this.state.bio) {
            this.setState({
                buttonText: "Edit your bio"
            });
        } else {
            this.setState({
                buttonText: "Add your bio"
            });
        }
    }

    render() {
        let buttonText;
        this.props.bio
            ? (buttonText = "Edit your bio")
            : (buttonText = "Add your bio");
        if (this.state.editingMode) {
            return (
                <div className="bio-editor">
                    <div className="bioeditor-icon">
                        <img
                            src="images/save-button.png"
                            className="bioeditor-btn"
                            onClick={this.saveBio}
                        />
                        <p onClick={this.saveBio}>Save</p>
                    </div>
                    <textarea
                        onChange={e => this.handleChange(e)}
                        defaultValue={this.props.bio}
                    />
                </div>
            );
        } else {
            return (
                <div className="bio-editor">
                    <p className="new-line">{this.props.bio}</p>
                    <div className="bioeditor-icon">
                        <img
                            onClick={this.showBio}
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

// static getDerivedStateFromProps(props, state) {
// if (!props.bio)
// }
