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
            imageUrl: "",
            uploaderIsVisible: false
        };
        // this.toggleModal = this.toggleModal.bind(this);
    }
    componentDidMount() {
        console.log("app has mounted");
        axios.get("/user").then(({ data }) => {
            this.setState({
                first: data.first,
                last: data.last,
                imageUrl: data.url,
                uploaderIsVisible: false
            });
        });
        this.closeModal = this.closeModal.bind(this);
    }
    toggleModal() {
        console.log("toggleModal is running!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    closeModal() {
        this.setState({
            uploaderIsVisible: false
        });
    }
    methodInApp(imageUrl) {
        console.log("I am a method in App!");
        console.log("muffin: ", imageUrl);
        this.setState({
            imageUrl: imageUrl
        });
        this.toggleModal();
    }
    render() {
        return (
            <div className="app-container">
                <div className="app-header">
                    <img
                        className="app-logo"
                        src="/images/skate2.png"
                        alt="logo"
                    />
                    <ProfilePic
                        className="small-pic"
                        toggleFunction={this.toggleModal.bind(this)}
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            methodInApp={this.methodInApp.bind(this)}
                            closeModal={this.closeModal}
                        />
                    )}
                </div>
                <div className="app-main"></div>
            </div>
        );
    }
}
