import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("Uploader has mounted");
        console.log("this.props: ", this.props);
        this.props.methodInApp("I am a muffin!");
        // axios.get()
        // this is where we want to contact the server and ask info about the user
        // when we get info back we wanto to add it to state... setState
    }
    render() {
        return (
            <div>
                <h3>I am the uploader!</h3>
            </div>
        );
    }
}
