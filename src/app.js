import React from "react";
import axios from "./axios";
// import Logo from "./logo";
import { ProfilePic } from "./profilepic";
import Uploader from "./uploader";
import { Profile } from "./profile";

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
        if (!this.state.first) {
            return null;
        }
        return (
            <div className="app-container">
                <div className="app-header">
                    <img
                        className="app-logo"
                        src="/images/skate2.png"
                        alt="logo"
                    />

                    <div className="navbar">
                        <ProfilePic
                            toggleFunction={this.toggleModal.bind(this)}
                            first={this.state.first}
                            last={this.state.last}
                            imageUrl={this.state.imageUrl}
                            profilePicClass="small-profile"
                        />
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                methodInApp={this.methodInApp.bind(this)}
                                closeModal={this.closeModal}
                            />
                        )}
                    </div>
                </div>
                <div className="app-main">
                    <Profile
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                    />
                </div>
            </div>
        );
    }
}
