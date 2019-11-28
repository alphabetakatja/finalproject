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

        this.props.methodInApp("I am a muffin!");
        // axios.get()
        // this is where we want to contact the server and ask info about the user
        // when we get info back we wanto to add it to state... setState
    }
    handleClick(e) {
        e.preventDefault();
        var fd = new FormData();
        fd.append("file", this.state.imageUrl);
        axios
            .post("/upload", fd)
            .then(response => {
                console.log("response from post upload ", response.data);
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
                <h3>Would you like to upload a photo?</h3>
                <label>Upload</label>
                <input
                    className="upload-file"
                    type="file"
                    name="file"
                    onChange={e => this.handleChange(e)}
                />
                <button
                    className="upload-btn"
                    type="submit"
                    name="button"
                    onClick={e => this.handleClick(e)}
                >
                    Submit
                </button>
            </div>
        );
    }
}
