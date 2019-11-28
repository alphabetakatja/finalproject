import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: null
        };
    }
    componentDidMount() {
        console.log("Uploader has mounted");
        console.log("this.props: ", this.props.methodInApp);
    }
    // closeModal(e) {
    //     e.preventDefault();
    //     console.log("Closing the modal");
    //     this.setState({
    //         uploaderIsVisible: !this.state.uploaderIsVisible
    //     });
    // }
    handleClick(e) {
        e.preventDefault();
        var fd = new FormData();
        fd.append("file", this.state.imageUrl);
        axios
            .post("/upload", fd)
            .then(response => {
                console.log("response from post upload ", response.data);
                console.log("this is post upload: ", this);
                this.props.methodInApp(response.data.imageUrl.url);
            })
            .catch(function(err) {
                console.log("error in post upload: ", err);
            });
    }
    handleChange(e) {
        console.log("handleChange is happening!");
        console.log("e.target.files[0]", e.target.files[0]);
        this.setState({
            imageUrl: e.target.files[0]
        });
    }
    render() {
        return (
            <div className="uploader-modal">
                <h2 onClick={this.props.closeModal} id="closeBox">
                    x
                </h2>
                <h3>Would you like to upload a photo?</h3>

                <div className="upload-container">
                    <input
                        className="upload-file"
                        type="file"
                        name="file"
                        onChange={e => this.handleChange(e)}
                    />
                    <label>Upload</label>
                    <button
                        className="upload-btn"
                        type="submit"
                        name="button"
                        onClick={e => this.handleClick(e)}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}
