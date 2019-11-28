import React from "react";
import axios from "./axios";
// import Logo from "./logo";
import { ProfilePic } from "./profilepic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    componentDidMount() {
        console.log("app has mounted");
        // axios.get()
        // this is where we want to contact the server and ask info about the user
        // when we get info back we wanto to add it to state... setState
    }
    toggleModal() {
        console.log("toggleModal is running!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    methodInApp(muffin) {
        console.log("I am a method in App!");
        console.log("muffin: ", muffin);
    }
    render() {
        return (
            <div>
                <h1 onClick={this.toggleModal}>Hello from App!</h1>
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
