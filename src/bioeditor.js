import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit Bio...",
            bioIsVisible: false
        };
        this.showBio = this.showBio.bind(this);
        this.saveBio = this.saveBio.bind(this);
    }
    componentDidMount() {
        console.log("props in Bio editor: ", this.props);
        //if user has no bio === setState
        // axios request here
        if (!this.props.bio) {
            console.log("no bio");
            this.setState(
                {
                    buttonText: "Add your Bio..."
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
        console.log("this.state.bio", this.state.bio);
        axios
            .post("/bio", this.state)
            .then(({ data }) => {
                console.log("response from post upload ", data);
                console.log("this is post upload: ", this.props);
                this.props.updateBio(data.bio);
                this.showBio();
            })
            .catch(function(err) {
                console.log("error in post bio: ", err);
            });
    }

    render() {
        if (this.state.editingMode) {
            return (
                <div className="bio-editor">
                    <textarea
                        onChange={e => this.handleChange(e)}
                        defaultValue={this.props.bio}
                    />
                    <button onClick={this.saveBio} className="edit-btn">
                        Save
                    </button>
                </div>
            );
        } else {
            return (
                <div className="bio-editor">
                    <h2>I am the bio editor!</h2>
                    <p>{this.props.bio}</p>
                    <button onClick={this.showBio} className="edit-btn">
                        {this.state.buttonText}
                    </button>
                </div>
            );
        }
    }
}