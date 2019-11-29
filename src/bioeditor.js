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
    }
    componentDidMount() {
        console.log("props in Bio editor: ", this.props);
        //if user has no bio === setState
        // axios request here
        if (!this.props.bio) {
            console.log("no bio");
            this.setState(
                {
                    buttonText: "Add your bio..."
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

    render() {
        if (this.state.editingMode) {
            return (
                <div className="bio-editor">
                    <textarea defaultValue={this.props.bio} />
                    <button className="edit-btn">Save</button>
                </div>
            );
        } else {
            return (
                <div className="bio-editor">
                    <h2>I am the bio editor!</h2>
                    <button onClick={this.showBio} className="edit-btn">
                        {this.state.buttonText}
                    </button>
                </div>
            );
        }
    }
}
